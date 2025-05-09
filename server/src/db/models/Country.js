const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.Actor, {
        foreignKey: 'countryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Country.hasMany(models.Director, {
        foreignKey: 'countryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Country.hasMany(models.Location, {
        foreignKey: 'countryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Country.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      flag: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Country',
      tableName: 'countries',
      timestamps: true,
      underscored: true,
    }
  );
  return Country;
};
