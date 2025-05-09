const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.hasMany(models.Movie, {
        foreignKey: 'genreId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Genre.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      logo: {
        type: DataTypes.TEXT(200),
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 200],
        },
      },
    },
    {
      sequelize,
      modelName: 'Genre',
      tableName: 'genres',
      timestamps: true,
      underscored: true,
    }
  );
  return Genre;
};
