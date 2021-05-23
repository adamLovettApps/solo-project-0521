'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoTags = sequelize.define('PhotoTags', {
    tagId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  PhotoTags.associate = function(models) {
    // associations can be defined here
    
  };
  return PhotoTags;
};