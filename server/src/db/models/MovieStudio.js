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
        references: {
          model: 'movies',
          key: 'id',
        },
      },
      studioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'studios',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'MovieStudio',
      tableName: 'movies_studios',
      timestamps: false,
      underscored: true,
    }
  );
  return MovieStudio;
};
