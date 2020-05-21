module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 한글  + 이모티콘
      clloate: "utfmb4_general_ci",
    }
  );

  Post.associate = (db) => {
    // 테이블간 관계를 정의
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // retweet 관계
    db.Post.belongsToMany(db.HashTag, { as: "PostHashtag" }); // retweet 관계
    db.Post.belongsToMany(db.User, { through: "Like" }); // retweet 관계
    db.Post.belongsTo(db.User); // belongsTo : 1대다 관계에서 다에 해당
    // belongsTo가 있는 테이블에 다른테이블의 id를 저장 (Post테이블에 UserId저장)
  };

  return Post;
};
