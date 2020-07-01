const express = require("express");
const router = express.Router();
const db = require("../models");
const { isLoggedIn } = require("./middleware");

router.post("/", isLoggedIn, async (req, res, next) => {
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
      ],
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/images", (req, res) => {});

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

module.exports = router;
