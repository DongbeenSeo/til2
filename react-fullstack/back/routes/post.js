const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", async (req, res, next) => {
  // POST /api/post
  console.log(`POST /api/post`);
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const resultawait = Promise.all(
        //findOrCreate : //없으면 만들고 있으면 찾고
        hashtag.map((tag) =>
          db.Hashtag.findOrCreate({
            where: {
              name: tag.slice(1).toLowerCase(),
            },
          })
        )
      );
      console.log(result);
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

module.exports = router;
