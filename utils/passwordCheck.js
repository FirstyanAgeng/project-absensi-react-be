const bcrypt = require("bcrypt");
const UsersModel = require("../models/users");

const passwordCheck = async (nip, password) => {
  //database
  const userData = await UsersModel.findOne({ where: { nip: nip } });
  // pengecekan / komparasi password
  const compare = await bcrypt.compare(password, userData.password);
  //mengembalikan fungsi
  return { compare, userData };
};

module.exports = passwordCheck;
