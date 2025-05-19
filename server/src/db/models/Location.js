const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsTo(models.Country, {
        foreignKey: 'countryUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Location.hasMany(models.Studio, {
        foreignKey: 'locationUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Location.init(
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
      countryUuid: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      coatOfArms: {
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
      modelName: 'Location',
      tableName: 'locations',
      timestamps: true,
      underscored: true,
    }
  );
  return Location;
};
