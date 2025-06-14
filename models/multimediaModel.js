const { getGeneratedId } = require('../utils/generateCustomId');

module.exports = (sequelize, DataTypes) => {
    const Multimedia = sequelize.define("Multimedias", {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "multimedias"
        },
        //   categoryId: {
        //     type: DataTypes.UUID,
        //     allowNull: true,
        //     references: {
        //       model: "Categories",
        //       key: "id",
        //     },
        //   },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        mediaType: {
            type: DataTypes.ENUM("Image", "Video", "Audio", "Document", "Other"),
            allowNull: false,
            defaultValue: "Image",
        },
        mediaURL: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            comment: "Public or internal URL to the media file",
        },
        thumbnailURL: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            comment: "Optional thumbnail or preview image",
        },
        fileSize: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Size in bytes",
        },
        mimeType: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "E.g., video/mp4, image/jpeg",
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            validate: {
              isArrayOfStrings(value) {
                if (!Array.isArray(value) || !value.every(tag => typeof tag === 'string')) {
                  throw new Error('Tags must be an array of strings');
                }
              }
            }
        },          
        status: {
            type: DataTypes.ENUM("Draft", "Published", "Archived"),
            defaultValue: "Published",
            allowNull: false,
        },
        publishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });

        Multimedia.associate = (models) => {
            Multimedia.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
        };
  
        return Multimedia;
  };
  