const passport = require("passport");
const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser(async (user, done) => {
    //서버  쪽에 [{id: 3, cookie: 'asdf}]
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
      });
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  local();
};

/**
 * 로그인 정보를 서버쪽에 저장하기 보다 passport session에 저장하여 부하를 줄인다.?
 */
