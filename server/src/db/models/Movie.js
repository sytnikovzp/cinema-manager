const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.Genre, {
        foreignKey: 'genreId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Movie.belongsToMany(models.Actor, {
        through: models.MovieActor,
        foreignKey: 'movieId',
        otherKey: 'actorId',
      });
      Movie.belongsToMany(models.Director, {
        through: models.MovieDirector,
        foreignKey: 'movieId',
        otherKey: 'directorId',
      });
      Movie.belongsToMany(models.Studio, {
        through: models.MovieStudio,
        foreignKey: 'movieId',
        otherKey: 'studioId',
      });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
      },
      releaseYear: {
        type: DataTypes.INTEGER,
      },
      poster: {
        type: DataTypes.TEXT,
      },
      trailer: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 100],
        },
      },
      storyline: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Movie',
      tableName: 'movies',
      timestamps: true,
      underscored: true,
    }
  );
  return Movie;
};
