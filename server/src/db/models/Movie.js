const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.Genre, {
        foreignKey: 'genreUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Movie.belongsToMany(models.Actor, {
        through: models.MovieActor,
        foreignKey: 'movieUuid',
        otherKey: 'actorUuid',
      });
      Movie.belongsToMany(models.Director, {
        through: models.MovieDirector,
        foreignKey: 'movieUuid',
        otherKey: 'directorUuid',
      });
      Movie.belongsToMany(models.Studio, {
        through: models.MovieStudio,
        foreignKey: 'movieUuid',
        otherKey: 'studioUuid',
      });
    }
  }
  Movie.init(
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
      genreUuid: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      poster: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 3000],
        },
      },
      trailer: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 100],
        },
      },
      storyline: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 3000],
        },
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
