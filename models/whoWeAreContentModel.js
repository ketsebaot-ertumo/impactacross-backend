const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const WhoWeAreContent = sequelize.define('WhoWeAreContent', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      description1: DataTypes.TEXT,
      description2: DataTypes.TEXT,
      image_url: DataTypes.STRING,
    },{
      timestamps: true,
    });
  
    // WhoWeAreContent.associate = models => {
    //   WhoWeAreContent.belongsTo(models.Section, { foreignKey: 'section_id' });
    // };
  
    return WhoWeAreContent;
  };
  