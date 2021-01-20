const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res, next) => {
  //GET /api/posts
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
        // Op - operator, lt - less than, lte - less than equal
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
          //비밀번호를 제외한 데이터만 불러오기 위해
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
        // include남용은 성능 저하의 요인이 될 수 있다.
      ],
      order: [["createdAt", "DESC"]], // 정렬
      limit: parseInt(req.query.limit, 10),
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
