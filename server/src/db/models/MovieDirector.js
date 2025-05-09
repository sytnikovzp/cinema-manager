const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieDirector extends Model {
    static associate(models) {
      MovieDirector.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MovieDirector.belongsTo(models.Director, {
        foreignKey: 'directorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MovieDirector.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'movies',
          key: 'id',
        },
        validate: {
          isInt: true,
        },
      },
      directorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'directors',
          key: 'id',
        },
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'MovieDirector',
      tableName: 'movies_directors',
      timestamps: true,
      underscored: true,
    }
  );
  return MovieDirector;
};
