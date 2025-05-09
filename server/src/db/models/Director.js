const { Model } = require('sequelize');

const {
  isBeforeCurrentDate,
  deathAfterBirth,
} = require('../../utils/sharedFunctions');

module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    static associate(models) {
      Director.belongsTo(models.Country, {
        foreignKey: 'countryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Director.belongsToMany(models.Movie, {
        through: models.MovieDirector,
        foreignKey: 'directorId',
        otherKey: 'movieId',
      });
    }
  }
  Director.init(
    {
      fullName: {
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
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBeforeCurrentDate,
        },
      },
      deathDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBeforeCurrentDate,
          deathAfterBirth(value) {
            deathAfterBirth(value, this.birthDate);
          },
        },
      },
      photo: {
        type: DataTypes.TEXT(200),
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 200],
        },
      },
      biography: {
        type: DataTypes.TEXT(200),
        allowNull: true,
        validate: {
          len: [0, 200],
        },
      },
    },
    {
      sequelize,
      modelName: 'Director',
      tableName: 'directors',
      timestamps: true,
      underscored: true,
    }
  );
  return Director;
};
