const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    /**
     *  hashtag검색을 post table에서 할 때
     *  where 조건을 post table이 아니라 hashtag를 include하는 구문에 적어야 한다.
     *  */
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
        {
          model: db.User,
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"],
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
    /**
     * hashtag의 내용이 한글이나 주소창에 입력되지 않는 내용일 경우
     * decodeURIComponent함수를 사용해야 한다.
     */
    res.json(posts);
  } catch (err) {
    console.error(err);
    next(e);
  }
});

module.exports = router;
