require('dotenv').config({ quiet: true });
const cors = require("cors");
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
};

module.exports = {
    server,
    app,
    express
};