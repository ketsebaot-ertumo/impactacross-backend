const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Gallery = sequelize.define('Gallery', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      // image_url: DataTypes.TEXT,
      // video_url: DataTypes.TEXT,
      category: DataTypes.STRING,
      media_type: {
        type: DataTypes.ENUM('image', 'video'),
        allowNull: false,
      },
      media_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },{
      timestamps: true,
    });

    return Gallery;
  };
  