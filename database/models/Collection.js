module.exports = (sequelize, dataTypes) => {
    let alias = 'Collection';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
        
    };
    let config = {
        tableName: 'collections',
        timestamps: false
    };
    const Collection = sequelize.define(alias, cols, config)

    Collection.associate = function(models){
        Collection.hasMany(models.Product, {
            foreignKey:"collection_id",
            as:"collection"
            });

        return Collection
    }
}