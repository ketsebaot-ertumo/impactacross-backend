const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
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
      date: DataTypes.DATE,
      client: DataTypes.STRING,
      description: DataTypes.TEXT,
    },{
      timestamps: true,
    });
  
    Project.associate = models => {
      Project.belongsTo(models.Section, { foreignKey: 'section_id' });
    };
  
    return Project;
  };
  