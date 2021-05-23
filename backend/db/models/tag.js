'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagname: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    const columnMapping = {
      foreignKey: 'tagId',
      through: 'PhotoTag',
      otherKey: 'photoId',
    };
    Tag.belongsToMany(models.Photo, columnMapping);
  };
  return Tag;
};