const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    static associate(models) {
      Studio.belongsTo(models.Location, {
        foreignKey: 'locationUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Studio.belongsToMany(models.Movie, {
        through: models.MovieStudio,
        foreignKey: 'studioUuid',
        otherKey: 'movieUuid',
      });
    }
  }
  Studio.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      locationUuid: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      foundationYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 3000],
        },
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 3000],
        },
      },
    },
    {
      sequelize,
      modelName: 'Studio',
      tableName: 'studios',
      timestamps: true,
      underscored: true,
    }
  );
  return Studio;
};
