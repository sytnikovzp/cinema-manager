const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsTo(models.Country, {
        foreignKey: 'countryId',
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
      },
      countryId: DataTypes.INTEGER,
      coatOfArms: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Location',
      tableName: 'locations',
      timestamps: false,
      underscored: true,
    }
  );
  return Location;
};
