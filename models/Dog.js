const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Dog extends Model {}

Dog.init(
{
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    description: {
    type: DataTypes.STRING,
    },
    // TODO: possibly change integer to string?
    age: {
        type: DataTypes.INTEGER,
    },
    size: {
        type: DataTypes.STRING,
    },
    kidFriendly: {
        type: DataTypes.BOOLEAN,
    },
    user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'users',
        key: 'id',
    },
    },
},
{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'dog',
}
);

module.exports = Dog;
