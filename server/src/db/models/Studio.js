const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    static associate(models) {
      Studio.belongsTo(models.Location, {
        foreignKey: 'locationId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Studio.belongsToMany(models.Movie, {
        through: models.MovieStudio,
        foreignKey: 'studioId',
        otherKey: 'movieId',
      });
    }
  }
  Studio.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
      },
      foundationYear: {
        type: DataTypes.INTEGER,
      },
      logo: {
        type: DataTypes.TEXT,
      },
      about: {
        type: DataTypes.TEXT,
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
