const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const AboutUs = sequelize.define('AboutUs', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      description1: DataTypes.TEXT,
      description2: DataTypes.TEXT,
      // description3: DataTypes.TEXT,
      image_url: DataTypes.STRING,
    },{
      timestamps: true,
    });
  
    return AboutUs;
  };
  