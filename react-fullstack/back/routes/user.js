const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const db = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
  // loadUser
  if (!req.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});

router.post("/", async (req, res, next) => {
  //회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    /**
     * saltOrRounds: The salt to be used in encryption
     * 10~13으로 설정 숫자가 커지면 서버의 부하가 많이 걸린다.
     * */

    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    // console.log(newUser);
    return res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

//남의 정보 가져오는 것 ex) http://localhost:3065/3, :id - req.params.id
router.get("/:id", (req, res) => {});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Success Logout");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      // console.log(info.reason);
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              as: "Posts",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id"],
            },
          ],
          attributes: ["id", "nickname", "userId"],
        });
        // console.log(fullUser);
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.get("/:id/follow", (req, res) => {});

router.delete("/:id/follow", (req, res) => {});

router.delete("/:id/follower", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

module.exports = router;
