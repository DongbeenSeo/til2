const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const db = require("../models");
const { isLoggedIn } = require("./middleware");

const upload = multer({
  // server storage에 저장 유무
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "uploads");
    },
    filename(req, file, callback) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      // ex) image.png, ext === .png, basename === image
      // ext는 extension, 확장자
      callback(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

/**
 * formData file -> req.file(s);
 * formData text -> req.body
 *
 * image upload기능이 필요하지 않기 때문에 upload.none()
 */

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  // POST /api/post
  // console.log(`POST /api/post`);
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    let newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        //findOrCreate : //없으면 만들고 있으면 찾고
        hashtags.map((tag) =>
          db.Hashtag.findOrCreate({
            where: {
              name: tag.slice(1).toLowerCase(),
            },
          })
        )
      );
      await newPost.addHashtags(result.map((r) => r[0]));
      /**
       * post에 hashtag를 추가
       * addHashtags는 sequelize에서 만들어 주는 함수
       * db의 relation을 정의해두면 (hasMany, belongsToMany ...) sequelize에서 생성된다.
       */
    }
    if (req.body.image) {
      // 이미지 주소를 여러개 올리면 image: [addr1, addr2]
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((img) => {
            return db.Image.create({ src: img });
          })
        );
        await newPost.addImages(images);
      } else {
        const image = await db.Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }
    /**
     * const User = await newPost.getUser();
     * newPost.User = User;
     * res.json(newPost);
     */
    const fullPost = await db.Post.findOne({
      where: {
        id: newPost.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//upload.array('name') -> name은 front에서 Formdata에 append하는 name을 입력
router.post("/images", upload.array("image"), (req, res) => {
  res.json(req.files.map((value) => value.filename));
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    // 게시글 가져오는 query를 middleware로 묶어보기!
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    // 게시글 관련 api는 게시글 유무 체크
    if (!post) {
      return res.status(404).send("not exist post");
    }
    await db.Post.destroy({ where: { id: req.params.id } });
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("not exist post");
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("not exist post");
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    return res.json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).send("포스트가 존재 하지 않습니다.");
    }
    await post.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).send("포스트가 존재 하지 않습니다.");
    }
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/retweet", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Post,
          as: "Retweet",
        },
      ],
    });
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다.");
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send("자신의 글을 리트윗할 수 없습니다.");
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send("이미 리트윗했습니다.");
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet",
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where: {
        id: retweet.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
    });
    res.json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// router.post("/:id/like", isLoggedIn, async (req, res, next) => {
//   try {
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// });

module.exports = router;
