const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Section = sequelize.define('Section', {
      id: {
        type: DataTypes.STRING,
        defaultValue: getGeneratedId,
        primaryKey: true,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },{
      timestamps: true,
      freezeTableName: true
    });
  
    Section.associate = models => {
      Section.hasMany(models.WhatWeDoImage, { foreignKey: 'section_id', as: 'whatWeDoImages' });
      Section.hasMany(models.Service, { foreignKey: 'section_id', as: 'services'  });
      Section.hasMany(models.Team, { foreignKey: 'section_id', as: 'teams'  });
      Section.hasMany(models.Project, { foreignKey: 'section_id', as: 'projects'  });
      Section.hasMany(models.Partner, { foreignKey: 'section_id', as: 'partners'  });
    };
  
    return Section;
  };
  