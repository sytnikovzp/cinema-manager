const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieActor extends Model {
    static associate(models) {
      MovieActor.belongsTo(models.Movie, {
        foreignKey: 'movieId',
      });

      MovieActor.belongsTo(models.Actor, {
        foreignKey: 'actorId',
      });
    }
  }
  MovieActor.init(
    {
      movieId: DataTypes.INTEGER,
      actorId: DataTypes.INTEGER,
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
