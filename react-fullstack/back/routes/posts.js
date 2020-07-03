const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res, next) => {
  //GET /api/posts
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"], //비밀번호를 제외한 데이터만 불러오기 위해
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
      ],
      order: [["createdAt", "DESC"]], // 정렬
    });
    res.json(posts);
    /**
     * db에서 불러온 데이터를 toJson처리 하는 경우
     * - 데이터를 변형해야 할 때
     */
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
