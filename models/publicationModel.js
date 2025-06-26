const { getGeneratedId } = require('../utils/generateCustomId');

// module.exports = (sequelize, DataTypes) => {
//     const Publication = sequelize.define("Publications", {
//         id: {
//             type: DataTypes.STRING,
//             defaultValue: getGeneratedId,
//             primaryKey: true,
//             allowNull: false,
//         },
//         userId: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             references: {
//                 model: 'Users',
//                 key: 'id'
//             },
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: "publications"
//         },
//         author: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: "Admin",
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             // unique: true,
//         },
//         slug: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             // unique: true,
//         },
//         content: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         imageURL: {
//             type: DataTypes.STRING(500),
//             allowNull: true
//         },
//         fileURL: {
//             type: DataTypes.STRING(500),
//             allowNull: true
//         },
//         published_at: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         status: {
//             type: DataTypes.ENUM("Draft", "Published", "Archived"),
//             allowNull: false,
//             defaultValue: "Draft",
//             validate: {
//                 isIn: [["Draft", "Published", "Archived"]],
//             },
//         },        
//     },{
//         timestamps: true,
//     });
  
//     Publication.associate = (models) => {
//         Publication.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
//     };
  
//     return Publication;
//   };
  
module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define('Publication', {
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
                key: 'id'
            },
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        authors: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "Comma-separated list of authors",
        },
        editors: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Comma-separated list of editors if applicable",
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              min: 1900,
              max: new Date().getFullYear() + 1,
            },
        },
        publication_type: {
            type: DataTypes.ENUM(
              "Book Chapter",
              "Policy Insight",
              "Occasional Paper",
              "Report",
              "Journal Article",
              "Other"
            ),
            allowNull: false,
            defaultValue: "Other",
        },
        source: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Name of the source publication or publisher",
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "City or organization location (e.g., Nairobi, Kenya)",
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
              isUrl: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'publications'
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
  
    Publication.associate = (models) => {
        Publication.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    };
  
    return Publication;
  };
  