const express = require("express");

const db = require("./models");
const app = express();
db.sequelize.sync();

/**
 * get: 조회
 * post: 생성
 * put: 부분수정
 * patch: 전체수정
 * delete: 삭제
 */

app.get("/", (req, res) => {
  // http://localhost:8080/${address}
  res.send("Hello server"); // address안에 들어가는 주소 설정
});

app.get("/about", (req, res) => {
  res.send("Hello, about");
});

app.listen(3065, () => {
  console.log("server is running on localhost:3065");
});
