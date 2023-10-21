require('dotenv').config();
const { Client } = require('pg');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false,
    native: false,
});

// const client = new Client({
//     host: DB_HOST,
//     port: DB_PORT,
//     user: DB_USER,
//     password: DB_PASSWORD
// });
// let sequelize;
// client.connect()
//     .then(() => {
//         // Verificar si la base de datos existe
//         return client.query(`SELECT datname FROM pg_database WHERE datname = '${DB_NAME}'`);
//     })
//     .then((result) => {
//         if (result.rows.length === 0) {
//             // La base de datos no existe, créala
//             return client.query(`CREATE DATABASE ${DB_NAME}`);
//         }
//     })
//     .then(() => client.end())
//     .then(() => {
//         // Después de crear o verificar la base de datos, intenta conectarte a ella
//         sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
//             logging: false,
//             native: false
//         });
//     })
//     .then(() => {
//         console.log('Conexión a la base de datos establecida con éxito.');
//     })
//     .catch(err => {
//         console.error('No pudo conectarse a la base de datos:', err);
//     });



const basename = path.basename(__filename);
const modelDefiniers = [];

fs.readdirSync(path.join(__dirname, './models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiniers.push(require(path.join(__dirname, '/models', file)));
    });
modelDefiniers.forEach(model => model(sequelize));

// sequelize.sync().then(() => {
//     console.log('Sincronización de la base de datos completa.');
// }).catch((error) => {
//     console.error('Error de sincronización de la base de datos: ', error);
// });

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {
    User,
    Artist,
    Favorites,
    Items_Favorites,
    Items_PlayList,
    Play_List,
    Track
} = sequelize.models;

User.hasMany(Play_List);
Play_List.belongsTo(User);

User.hasMany(Favorites);
Favorites.belongsTo(User);

Play_List.belongsToMany(Track, { through: Items_PlayList });
Track.belongsToMany(Play_List, { through: Items_PlayList });

Favorites.belongsToMany(Track, { through: Items_Favorites });
Track.belongsToMany(Favorites, { through: Items_Favorites });

Artist.hasMany(Track);
Track.belongsTo(Artist);

module.exports = {
    ...sequelize.models,
    conn: sequelize
};