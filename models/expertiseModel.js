const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Expertise = sequelize.define('Expertise', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      image_url: DataTypes.STRING,
    },{
      timestamps: true,
    });
  
    return Expertise;
  };
  