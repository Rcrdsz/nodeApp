const express = require('express');
const consign = require('consign');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const app = express();

app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/testBack',
        collectionName:'sessions',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

consign().include('routes').include('utils').into(app);

app.listen(3000, '127.0.0.1', () => {
    console.log('Server Up and good');
});