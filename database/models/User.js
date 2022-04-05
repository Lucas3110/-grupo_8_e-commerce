module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        }                 
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    User.associate = function(models){
        User.belongsTo(models.Category, {
            foreignKey:"category_id",
            as:"category"
            });
    
    }

    return User
}