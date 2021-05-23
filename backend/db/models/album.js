'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.hasMany(models.Photo, { foreignKey: "albumId"});
    Album.belongsTo(models.User, { foreignKey: "userId"})
  };
  return Album;
};