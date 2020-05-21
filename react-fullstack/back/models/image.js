module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      clloate: "utf_general_ci",
    }
  );

  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };

  return Image;
};