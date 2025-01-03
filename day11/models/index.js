"use strict";
/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2020*/
/**
 * Sequelize File
 * @copyright 2020 Manaknightdigital Inc.
 * @link https://manaknightdigital.com
 * @license Proprietary Software licensing
 * @author Ryan Wong
 *
 */
const fs = require("fs");
const path = require("path");
let Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const basename = path.basename(__filename);
const config = {
  DB_DATABASE: "root",
  DB_USERNAME: "root",
  DB_PASSWORD: "Omidihoney10",
  DB_ADAPTER: "mysql",
  // DB_NAME: "root",
  DB_HOSTNAME: "localhost",
  DB_PORT: 3306,
};

let db = {};

let sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    dialect: config.DB_ADAPTER,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    // database: config.DB_NAME,
    host: config.DB_HOSTNAME,
    port: config.DB_PORT,
    logging: console.log,
    timezone: "-04:00",
    pool: {
      maxConnections: 1,
      minConnections: 0,
      maxIdleTime: 100,
    },
    define: {
      timestamps: false,
      underscoredAll: true,
      underscored: true,
    },
  }
);

sequelize.sync({ force: true });


fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    var model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.movie = movie;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// const seed = require("../seed")(sequelize, DataTypes, db);



sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  // sequelize.sync({ alter: true });

  let Movie = require('./Movie')(sequelize, DataTypes);
let Actor = require('./Actor')(sequelize, DataTypes);
// let Director = require('./Director')(sequelize, DataTypes);
let Genre = require('./Genre')(sequelize, DataTypes);

sequelize.sync({ force: true }).then(async function() {
  const defaultMovies = [
    { title: 'Interstellar', director_id: 1, status: 1, review: 5, main_genre: 1 },
    { title: 'Inception', director_id: 2, status: 1, review: 4, main_genre: 2 },
  ];

  const defaultActors = [
    { name: 'Leonardo DiCaprio', age: 46, nationality: 'American' },
    { name: 'Matthew McConaughey', age: 51, nationality: 'American' },
  ];

  const defaultDirectors = [
    { name: 'Christopher Nolan', age: 50, nationality: 'British' },
    { name: 'Quentin Tarantino', age: 58, nationality: 'American' },
  ];

  const defaultGenres = [
    {  name: 'Sci-Fi' },
    { name: 'Thriller' },
  ];
  

  for (let movie of defaultMovies) {
    await Movie.create(movie);
  }

  for (let actor of defaultActors) {
    await Actor.create(actor);
  }

  // for (let director of defaultDirectors) {
  //   await Director.create(director);
  // }

  for (let genre of defaultGenres) {
    await Genre.create(genre);
  }
});

// console.log("db",db);


module.exports = db;
