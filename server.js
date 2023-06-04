const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const port = 3001;

//database
const sequelize = require("./db.config");
sequelize.sync().then(() => console.log("database ready"));

//endpoint
const userEndpoint = require("./routes/users");
const absensiEndpoint = require("./routes/absensi");

//inisialisasi express
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userEndpoint);
app.use("/absensi", absensiEndpoint);

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
