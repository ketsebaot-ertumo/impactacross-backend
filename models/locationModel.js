const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Owner",
          key: "id",
        },
      },
      address: DataTypes.STRING,
      lat: DataTypes.INTEGER,
      lng: DataTypes.INTEGER,
    },{
      timestamps: true,
    });
  
    Location.associate = models => {
      Location.belongsTo(models.Owner, { foreignKey: 'owner_id' });
    };
  
    return Location;
  };
  