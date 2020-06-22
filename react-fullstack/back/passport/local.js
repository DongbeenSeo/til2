const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password",
      },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({
            where: { userId },
          });
          if (!user) {
            //fail
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            // success
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀립니다." });
        } catch (e) {
          console.error(e);
          // server error
          // error발생시에는 첫번째 param에 정보를 넣는다.
          return done(e);
        }
      }
    )
  );
};
