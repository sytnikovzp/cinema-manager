const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieActor extends Model {
    static associate(models) {
      MovieActor.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MovieActor.belongsTo(models.Actor, {
        foreignKey: 'actorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MovieActor.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id',
        },
      },
      actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'actors',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'MovieActor',
      tableName: 'movies_actors',
      timestamps: false,
      underscored: true,
    }
  );
  return MovieActor;
};
