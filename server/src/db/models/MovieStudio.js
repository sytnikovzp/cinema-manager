const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieStudio extends Model {
    static associate(models) {
      MovieStudio.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MovieStudio.belongsTo(models.Studio, {
        foreignKey: 'studioId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MovieStudio.init(
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
      studioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'studios',
          key: 'id',
        },
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'MovieStudio',
      tableName: 'movies_studios',
      timestamps: true,
      underscored: true,
    }
  );
  return MovieStudio;
};
