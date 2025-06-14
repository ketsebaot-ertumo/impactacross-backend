const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Partner = sequelize.define('Partner', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      section_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Section",
          key: "id",
        },
      },
      name: DataTypes.STRING,
      logo_url: DataTypes.TEXT,
    },{
      timestamps: true,
    });
  
    Partner.associate = models => {
      Partner.belongsTo(models.Section, { foreignKey: 'section_id', as: "section" });
    };
  
    return Partner;
  };
  