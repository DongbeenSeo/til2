const passport = require("passport");
const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser(async (user, done) => {
    //서버  쪽에 [{id: 3, cookie: 'asdf'}]
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
      });
      return done(null, user); //req.user
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  local();
};

/**
 * 로그인 정보를 서버쪽에 저장하기 보다 passport session에 저장하여 부하를 줄인다.?
 *
 * 프론트에서 서버로는 cookie만 보낸다({cookie: 'asdf'})
 * 서버가 cookie-parer, express-session으로 znzlrjatkgn id: 3발견
 * id: 3이 deserializeUser에 들어감
 * req.user로 사용자 정보가 들어감
 *
 * 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
 * 실무에서는 deserializeUser 결과물 캐싱
 */
