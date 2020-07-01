module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 한글  + 이모티콘
      collate: "utf8mb4_general_ci",
    }
  );

  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
    // belongsToMany : 다대다 관계
    // 다대다 관계는 중간에 table이 생긴다.
    // Post - PostHashtag - hashTag
  };

  return Hashtag;
};
