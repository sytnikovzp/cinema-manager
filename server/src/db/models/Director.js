const { Model } = require('sequelize');

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
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      deathDate: {
        type: DataTypes.DATEONLY,
      },
      photo: {
        type: DataTypes.TEXT,
      },
      biography: {
        type: DataTypes.TEXT,
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
