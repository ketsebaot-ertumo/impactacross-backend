const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define('Owner', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      primary_color: DataTypes.STRING,
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      font_family: DataTypes.STRING,
      font_url: DataTypes.TEXT,
      email: DataTypes.STRING,
      logo_url: DataTypes.STRING,
    },{
      timestamps: true, 
      freezeTableName: true
    });
  
    Owner.associate = models => {
      Owner.hasMany(models.Phone, { foreignKey: 'owner_id', as: "phones" });
      Owner.hasMany(models.Location, { foreignKey: 'owner_id', as: "locations" });
      Owner.hasMany(models.OwnerLink, { foreignKey: 'owner_id', as: "links" });
    };
  
    return Owner;
  };
  