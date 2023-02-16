const express = require("express");
const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");
const databaseName = "apprendre";
const username = "admin";
const password = "password";
const host = "localhost";
const dialect = "mariadb";
const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: dialect,
});

sequelize.define("User", {
  name: DataTypes.STRING,
  lastName: DataTypes.INTEGER,
  age: DataTypes.INTEGER,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
});

sequelize.sync();

// instanciation de express
const app = express();
const port = 4000;
app.use(express.json());

app.post("/user", async (req, res) => {
  const user = req.body;
  // SQL
  const User = sequelize.models.User;
  await User.create({
    username: req.body.username,
    lastName: req.body.lastName,
    age: req.body.age,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
  });
  res.json("BDD créé !");
});

app.listen(port, function () {
  console.log("serveur start at localhost: ", port);
});

const pass = "maysuperpassword";

const hashPassword = bcrypt.hashSync(pass, 10);

console.log(hashPassword);
