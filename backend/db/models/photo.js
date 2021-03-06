'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    albumId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    caption: {
      type: DataTypes.TEXT,
      defaultValue: "The band played on..."
    }
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
    Photo.belongsTo(models.User, { foreignKey: "userId"});
    Photo.belongsTo(models.Album, { foreignKey: "albumId"});
    Photo.hasMany(models.Favorite, { foreignKey: "photoId"})
    Photo.hasMany(models.Comment, { 
      foreignKey: "photoId", 
      onDelete: "CASCADE",
      hooks: true,
    })
    const columnMapping = {
      foreignKey: 'photoId',
      through: 'PhotoTag',
      otherKey: 'tagId',
    };
    Photo.belongsToMany(models.Tag, columnMapping);
  };
  return Photo;
};