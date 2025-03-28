const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    static associate(models) {
      Actor.belongsTo(models.Country, {
        foreignKey: 'countryId',
      });

      Actor.belongsToMany(models.Movie, {
        through: models.MovieActor,
        foreignKey: 'actorId',
      });
    }
  }
  Actor.init(
    {
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      countryId: DataTypes.INTEGER,
      birthDate: DataTypes.DATEONLY,
      deathDate: DataTypes.DATEONLY,
      photo: DataTypes.TEXT,
      biography: DataTypes.TEXT,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    },
    {
      sequelize,
      modelName: 'Actor',
      tableName: 'actors',
      underscored: true,
    }
  );
  return Actor;
};
