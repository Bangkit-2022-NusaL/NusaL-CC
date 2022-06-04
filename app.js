const express = require('express');
const app = express();
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const userRoutes = require('./api/routes/user');
const passwordReset = require("./api/routes/passwordReset");
const swaggerDocs = require('./swagger3.json');

//mongoose.connect('mongodb+srv://admin:admin@node-rest.ezacg.mongodb.net/?retryWrites=true&w=majority'); //for using atlas
mongoose.connect('mongodb://nusalUser:'+ process.env.MONGO_PW +'@34.101.143.194:27017/nusal').then(res => console.log("Connected to DB")).catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views','./views');

app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/user', userRoutes);
app.use("/password-reset", passwordReset);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;