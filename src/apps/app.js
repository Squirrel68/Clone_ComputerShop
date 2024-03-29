const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");

//dotenv
dotenv.config({ path: `${__dirname}/../../config.env` });
// CORS
app.use(cors());

//Session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Form
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/static", express.static(`${__dirname}/../public`));

// View
app.set("views", `${__dirname}/views`);
app.set("view engine", process.env.VIEW_ENGINE);

// Share menu
app.use(require("./middlewares/cart"));
app.use(require("./middlewares/share"));

// Router
app.use(require(`${__dirname}/../routers/web.js`));
module.exports = app;
