const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const helpers = require("./utils/helpers");
const sequelize = require('./config/connection');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000, //session expires after 5 minutes of inactivity
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});



