const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const WhatWeDoImage = sequelize.define('WhatWeDoImage', {
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
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      image_url: DataTypes.STRING,
    },{
      timestamps: true,
    });
  
    WhatWeDoImage.associate = models => {
      WhatWeDoImage.belongsTo(models.Section, { foreignKey: 'section_id', as: 'section' });
    };
  
    return WhatWeDoImage;
  };
  