module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT, // TEXT: 긴글
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 한글  + 이모티콘
      clloate: "utfmb4_general_ci",
    }
  );

  Comment.associate = (db) => {
    db.Comment.hasMany(db.User);
    db.Comment.hasMany(db.Post);
  };

  return Comment;
};
