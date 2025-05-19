const { Model, Sequelize } = require('sequelize');

const {
  isBeforeCurrentDate,
  deathAfterBirth,
} = require('../../utils/sharedFunctions');

module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    static associate(models) {
      Actor.belongsTo(models.Country, {
        foreignKey: 'countryUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Actor.belongsToMany(models.Movie, {
        through: models.MovieActor,
        foreignKey: 'actorUuid',
        otherKey: 'movieUuid',
      });
    }
  }
  Actor.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      countryUuid: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBeforeCurrentDate,
        },
      },
      deathDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBeforeCurrentDate,
          deathAfterBirth(value) {
            deathAfterBirth(value, this.birthDate);
          },
        },
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 3000],
        },
      },
      biography: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 3000],
        },
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
