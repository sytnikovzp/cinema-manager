const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    static associate(models) {
      Studio.belongsTo(models.Location, {
        foreignKey: 'locationId',
      });

      Studio.belongsToMany(models.Movie, {
        through: models.MovieStudio,
        foreignKey: 'studioId',
      });
    }
  }
  Studio.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      locationId: DataTypes.INTEGER,
      foundationYear: DataTypes.INTEGER,
      logo: DataTypes.TEXT,
      about: DataTypes.TEXT,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    },
    {
      sequelize,
      modelName: 'Studio',
      tableName: 'studios',
      underscored: true,
    }
  );
  return Studio;
};
