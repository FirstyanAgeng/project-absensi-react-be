const express = require("express");
const router = express.Router();
const UsersModel = require("../models/users");
const bcrypt = require("bcrypt");
const passwordCheck = require("../utils/passwordCheck");

//endpoint utama
router.get("/", async (req, res) => {
  try {
    const users = await UsersModel.findAll();
    res.status(200).json({
      data: users,
      metadata: "Users Endpoint",
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

//ADD DATA
router.post("/", async (req, res) => {
  try {
    //menerima data front end
    const { nip, nama, password, role } = req.body;
    //enkripsi password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //menyimpan data ke db
    const users = await UsersModel.create({
      nip,
      nama,
      password: encryptedPassword,
      role,
    });
    //menampilkan status
    res.status(200).json({
      registered: users,
      metadata: "add data berhasil",
    });
  } catch (e) {
    res.json({
      error: "data invalid",
    });
  }
});

//UPDATE DATA
router.put("/", async (req, res) => {
  //menerima data fe
  const { nip, nama, password, passwordBaru } = req.body;

  try {
    //fungsi pengecekan nip dan password
    const check = await passwordCheck(nip, password);
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10);

    //password harus sama dengan inputan
    if (check.compare === true) {
      const users = await UsersModel.update(
        {
          nama,
          password: encryptedPassword,
        },
        { where: { nip: nip } }
      );
      res.status(200).json({
        users: { updated: users[0] },
        metadata: "user data updated",
      });
    }
  } catch (e) {
    res.json({
      error: "data invalid",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    //inputan
    const { nip, password } = req.body;
    //fungsi pengecekan nip dan password
    const check = await passwordCheck(nip, password);
    if (check.compare === true) {
      res.status(200).json({
        users: check.userData,
        metadata: "login success",
      });
    }
  } catch (e) {
    res.status(400).json({
      error: "data invalid",
    });
  }
});

module.exports = router;
