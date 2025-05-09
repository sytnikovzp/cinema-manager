const { isBefore, parseISO } = require('date-fns');
const { Model } = require('sequelize');

function isBeforeCurrentDate(value) {
  const currentDate = new Date();
  if (!isBefore(parseISO(value), currentDate)) {
    throw new Error('Дата не може бути у майбутньому');
  }
}

function deathAfterBirth(value, birthDate) {
  if (birthDate && isBefore(parseISO(value), parseISO(birthDate))) {
    throw new Error('Дата смерті не може бути раніше дати народження');
  }
}

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
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: { isDate: true, isBeforeCurrentDate },
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
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 500],
        },
      },
      biography: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 5000],
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
