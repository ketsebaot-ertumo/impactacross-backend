module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define("Publications", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "publication"
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Admin",
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
            // unique: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        fileURL: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        published_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("Draft", "Published", "Archived"),
            allowNull: false,
            defaultValue: "Draft",
            validate: {
                isIn: [["Draft", "Published", "Archived"]],
            },
        },        
    },{
        timestamps: true,
    });
  
    Publication.associate = (models) => {
        Publication.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    };
  
    return Publication;
  };
  