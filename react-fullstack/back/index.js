const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");

db.sequelize.sync();

/**
 * get: 조회
 * post: 생성
 * put: 부분수정
 * patch: 전체수정
 * delete: 삭제
 */

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);

app.listen(3065, () => {
  console.log("server is running on localhost:3065");
});
