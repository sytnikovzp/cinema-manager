const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    static associate(models) {
      Actor.belongsTo(models.Country, {
        foreignKey: 'countryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Actor.belongsToMany(models.Movie, {
        through: models.MovieActor,
        foreignKey: 'actorId',
        otherKey: 'movieId',
      });
    }
  }
  Actor.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      countryId: {
        type: DataTypes.INTEGER,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      deathDate: {
        type: DataTypes.DATEONLY,
      },
      photo: {
        type: DataTypes.TEXT,
      },
      biography: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Actor',
      tableName: 'actors',
      timestamps: true,
      underscored: true,
    }
  );
  return Actor;
};
