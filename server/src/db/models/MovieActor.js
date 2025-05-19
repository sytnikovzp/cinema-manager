const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieActor extends Model {
    static associate(models) {
      MovieActor.belongsTo(models.Movie, {
        foreignKey: 'movieUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MovieActor.belongsTo(models.Actor, {
        foreignKey: 'actorUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MovieActor.init(
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
      actorUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'actors',
          key: 'uuid',
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
