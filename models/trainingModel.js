const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Training = sequelize.define('Trainings', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "trainings"
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      trainingType: {
        type: DataTypes.ENUM('Online', 'Offline', 'Hybrid'),
        allowNull: false,
        defaultValue: 'Online',
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      durationHours: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      certification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM('Draft', 'Completed', 'Archived'),
        allowNull: false,
        defaultValue: 'Draft',
      },
      imageURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      timestamps: true,
      tableName: 'Trainings',
    });
  
    Training.associate = (models) => {
      Training.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'trainer',
      });
    };
  
    return Training;
  };
  