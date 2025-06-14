const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const OwnerLink = sequelize.define('OwnerLink', {
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
      label: DataTypes.STRING,
      url: DataTypes.STRING,
    },{
      timestamps: true,
    });
  
    OwnerLink.associate = models => {
      OwnerLink.belongsTo(models.Owner, { foreignKey: 'owner_id' });
    };
  
    return OwnerLink;
  };
  