const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
// middleware
const checkForSession = require("./middlewares/checkForSession.js");

//controllers
const swag_controller = require("./controllers/swag_controller");
const auth_controller = require("./controllers/auth_controller");

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

// auth
app.post("/api/login", auth_controller.login);
app.post("/api/register", auth_controller.register);
app.post("/api/signout", auth_controller.signout);
app.get("/api/user", auth_controller.getUser);

//swag
app.get("/api/swag", swag_controller.read);

// Cart
app.post("/api/cart", cart_controller.add);
app.post("/api/cart/checkout", cart_controller.checkout);
app.delete("/api/cart", cart_controller.delete);

// Search
app.get("/api/search", search_controller.search);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
