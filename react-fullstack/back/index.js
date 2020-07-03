const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const passportConfig = require("./passport");
const path = require("path");

const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const hashtagAPIRouter = require("./routes/hashtag");

dotenv.config();
db.sequelize.sync();
const app = express();
passportConfig();

/**
 * get: 조회
 * post: 생성
 * put: 부분수정
 * patch: 전체수정
 * delete: 삭제
 */

app.use(morgan("dev"));
/**
 *  / -> front의 주소
 * 'uploads' => server의주소
 * front에서 upload경로를 root directory처럼 쓸 수 있다.
 */
app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
/**
 * origin, credential
 * - front & back server간에 cookie를 전달받을 수 있게 하는 option
 */
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false, //매번 session 강제 저장
    saveUninitialized: false, // 빈 값도 저장
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, //https를 쓸 때 true
    },
    name: "rnbck",
  })
);

// express로 cookie에 session이 저장되면 connect.sid로 저장
// 때문에 express의 취약점으로 공격을 당하기 때문에 name을 변경해주어야 한다.
app.use(passport.initialize());
app.use(passport.session());

// passport.session은 expressSession아래에 있어야 한다

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

app.listen(3066, () => {
  console.log("server is running on localhost:3065");
});
