module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define(
    "HashTag",
    {
      content: {
        type: DataTypes.STRING(20), // TEXT: 긴글
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 한글  + 이모티콘
      clloate: "utfmb4_general_ci",
    }
  );

  HashTag.associate = (db) => {
    db.HashTag.belongsToMany(db.Post, { through: "PostHashtag" });
    // belongsToMany : 다대다 관계
    // 다대다 관계는 중간에 table이 생긴다.
    // Post - PostHashtag - hashTag
  };

  return HashTag;
};
