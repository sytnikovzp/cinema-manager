const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieStudio extends Model {
    static associate(models) {
      MovieStudio.belongsTo(models.Movie, {
        foreignKey: 'movieUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MovieStudio.belongsTo(models.Studio, {
        foreignKey: 'studioUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MovieStudio.init(
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
      studioUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'studios',
          key: 'uuid',
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
