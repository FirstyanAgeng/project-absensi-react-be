const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

class Absensi extends Model {}

//membuat table Absensis
Absensi.init(
  {
    users_nip: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("in", "out"),
    },
  },
  {
    sequelize,
    modelName: "Absensi",
  }
);

module.exports = Absensi;

//orm js
