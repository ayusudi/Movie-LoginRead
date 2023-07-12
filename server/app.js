if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express");
const cors = require("cors")
const app = express();
const port = 3000;
const auth = require("./middlewares/auth")
const errorHandler = require("./middlewares/errorHandler")
const routesAuth = require("./routes/auth")
const routesUsers = require("./routes/users")
const routesMovies = require("./routes/movies")

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routesAuth);
app.use(auth)
app.use("/users", routesUsers);
app.use("/movies", routesMovies);

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
