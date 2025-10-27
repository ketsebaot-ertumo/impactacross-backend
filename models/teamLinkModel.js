const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const TeamLink = sequelize.define('TeamLink', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Team",
          key: "id",
        },
      },
      label: DataTypes.STRING,
      url: DataTypes.STRING,
    },{
      timestamps: true,
    });
  
    TeamLink.associate = models => {
      TeamLink.belongsTo(models.Team, { foreignKey: 'team_id' });
    };
  
    return TeamLink;
  };
  