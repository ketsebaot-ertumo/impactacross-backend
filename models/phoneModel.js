const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Phone = sequelize.define('Phone', {
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
      number: DataTypes.STRING,
    },{
      timestamps: true,
    });
  
    Phone.associate = models => {
      Phone.belongsTo(models.Owner, { foreignKey: 'owner_id' });
    };
  
    return Phone;
  };
  