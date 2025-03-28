const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.Genre, {
        foreignKey: 'genreId',
      });

      Movie.belongsToMany(models.Actor, {
        through: models.MovieActor,
        foreignKey: 'movieId',
      });

      Movie.belongsToMany(models.Director, {
        through: models.MovieDirector,
        foreignKey: 'movieId',
      });

      Movie.belongsToMany(models.Studio, {
        through: models.MovieStudio,
        foreignKey: 'movieId',
      });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      genreId: DataTypes.INTEGER,
      releaseYear: DataTypes.INTEGER,
      poster: DataTypes.TEXT,
      trailer: DataTypes.STRING,
      storyline: DataTypes.TEXT,
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
      modelName: 'Movie',
      tableName: 'movies',
      underscored: true,
    }
  );
  return Movie;
};
