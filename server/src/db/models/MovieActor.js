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
        primaryKey: true,
        references: {
          model: 'movies',
          key: 'id',
        },
        validate: {
          isInt: true,
        },
      },
      actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'actors',
          key: 'id',
        },
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'MovieActor',
      tableName: 'movies_actors',
      timestamps: true,
      underscored: true,
    }
  );
  return MovieActor;
};
