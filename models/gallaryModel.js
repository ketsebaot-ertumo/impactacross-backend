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
      image_url: DataTypes.TEXT,
      video_url: DataTypes.TEXT,
      type: DataTypes.STRING,
    },{
      timestamps: true,
    });

    return Gallery;
  };
  