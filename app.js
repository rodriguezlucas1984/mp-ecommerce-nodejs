const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const cors = require("cors");
const morgan = require("morgan");

const { crearPreferencias } = require("./util/preferencias_mp");
const { PORT } = require("./constants");

const port = PORT;

const app = express();

//Template engine
app.engine(
  "handlebars",
  engine({
    helpers: {
      ifeq: function (a, b, options) {
        if (a == b) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      json: function (context) {
        return JSON.stringify(context, null, 2);
      },
    },
  })
);
app.set("view engine", "handlebars");

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("assets"));
app.use("/assets", express.static(__dirname + "/assets"));
app.use(morgan("dev"));

//Routes
app.use(require("./routes/phone"));
app.use(require("./routes/pago"));

crearPreferencias()
  .then(() => console.log("Preferencias actualizadas"))
  .catch(console.log);

app.listen(port);
