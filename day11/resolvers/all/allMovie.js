

const { Movie } = require("../../models");

module.exports = async() => {
    try {
        const movies = await Movie.findAll(); // Assuming `Movie` is your Sequelize model
    
        return {
          data: movies.map(movie => movie.toJSON()) // or use movie.dataValues
        };
      } catch (error) {
        console.error('Error fetching movies:', error);
        return null;
      }
};
