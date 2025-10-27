const { getGeneratedId } = require('../utils/generateCustomId');
const { slugify } = require('../utils/slugify');

module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
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
      content: DataTypes.TEXT,
      image_url: DataTypes.TEXT,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },      
    },{
      timestamps: true,
      hooks: {
        beforeCreate: (service) => {
          if (service.title) {
            service.slug = slugify(service.title);
          }
        },
        beforeUpdate: (service) => {
          if (service.title) {
            service.slug = slugify(service.title);
          }
        },
      },
    });
  
    Service.associate = models => {
      Service.belongsTo(models.Section, { foreignKey: 'section_id' , as: "section"});
    };
  
    return Service;
  };
  