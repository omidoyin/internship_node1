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
const basename = path.basename(__filename);
const { DataTypes } = require("sequelize");
const config = {
  DB_DATABASE: "root",
  DB_USERNAME: "root",
  DB_PASSWORD: process.env.PASSWORD,
  DB_ADAPTER: "mysql",
  DB_NAME: "root",
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
    database: config.DB_NAME,
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
let Products = require("./products")(sequelize, DataTypes);

const defaultProducts = [
  {
    title: "Inception",
    image: "https://via.placeholder.com/600/771796",
    description: "A mind-bending heist movie directed by Christopher Nolan.",
    price: 5,
    id:1
  },
  {
    title: "Pulp Fiction",
    image: "https://via.placeholder.com/600/771796",
    description: "A cult classic crime film directed by Quentin Tarantino.",
    price: 10,
    id:2
  },
  {
    title: "Inception 20002",
    image: "https://via.placeholder.com/600/771796",
    description: "A mind-bending heist movie directed by Christopher Nolan.",
    price: 30,
    id:3
  },
  {
    title: "Pulp Fiction 20002",
    image: "https://via.placeholder.com/600/771796",
    description: "A cult classic crime film directed by Quentin Tarantino.",
    price: 15,
    id:4
  },
];

sequelize.sync({ alter: true })
// .then(() => {
//   for (let product of defaultProducts) {
//     Products.create(product);
//   }
// });

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
