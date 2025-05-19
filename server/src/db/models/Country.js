const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.Actor, {
        foreignKey: 'countryUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Country.hasMany(models.Director, {
        foreignKey: 'countryUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Country.hasMany(models.Location, {
        foreignKey: 'countryUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Country.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      flag: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 3000],
        },
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
