const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
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
      email: DataTypes.STRING,
      description: DataTypes.TEXT,
      linkedin: DataTypes.STRING,
      facebook: DataTypes.STRING,
      position: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },{
      timestamps: true,
      freezeTableName: true
    });
  
    Team.associate = models => {
      Team.belongsTo(models.Section, { foreignKey: 'section_id', as: 'section'  });
      Team.hasMany(models.TeamLink, { foreignKey: 'team_id', as: 'links'  });
    };
  
    return Team;
  };
  