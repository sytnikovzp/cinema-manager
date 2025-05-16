const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    static associate(models) {
      Studio.belongsTo(models.Location, {
        foreignKey: 'locationId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Studio.belongsToMany(models.Movie, {
        through: models.MovieStudio,
        foreignKey: 'studioId',
        otherKey: 'movieId',
      });
    }
  }
  Studio.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      foundationYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 200],
        },
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 200],
        },
      },
    },
    {
      sequelize,
      modelName: 'Studio',
      tableName: 'studios',
      timestamps: true,
      underscored: true,
    }
  );
  return Studio;
};
