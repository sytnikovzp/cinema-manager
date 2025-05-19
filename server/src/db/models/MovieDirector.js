const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieDirector extends Model {
    static associate(models) {
      MovieDirector.belongsTo(models.Movie, {
        foreignKey: 'movieUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MovieDirector.belongsTo(models.Director, {
        foreignKey: 'directorUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MovieDirector.init(
    {
      movieUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'movies',
          key: 'uuid',
        },
      },
      directorUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'directors',
          key: 'uuid',
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
