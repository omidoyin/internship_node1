const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // Movie Model
  const Movie = sequelize.define("Movie", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'Director',
      //   key: 'id',
      // },
    },
    main_genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review: {
      type: DataTypes.FLOAT,
    },
  });

  
  Movie.associate = (models) => {
    Movie.belongsTo(models.Director, { foreignKey: 'director_id' });
    Movie.belongsToMany(models.Actor, { through: models.MovieActor, foreignKey: 'movie_id' });
    Movie.belongsToMany(models.Genre, { through: models.GenreMovie, foreignKey: 'movie_id' });
    Movie.hasMany(models.Review, { foreignKey: 'movie_id' });
  };
  return Movie
};

