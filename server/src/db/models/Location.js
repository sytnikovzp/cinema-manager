const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsTo(models.Country, {
        foreignKey: 'countryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Location.hasMany(models.Studio, {
        foreignKey: 'locationId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Location.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      coatOfArms: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 200],
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
