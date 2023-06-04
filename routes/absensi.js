const express = require("express");
const router = express.Router();
const AbsensiModel = require("../models/absensi");

//endpoint utama
router.get("/", async (req, res) => {
  const absensi = await AbsensiModel.findAll();
  res.status(200).json({
    absensi,
    metadata: "Endpoint Absensi",
  });
});

//checkin
router.post("/checkin", async (req, res) => {
  const { nip } = req.body;
  const absensi = await AbsensiModel.create({
    users_nip: nip,
    status: "in",
  });
  res.status(200).json({
    data: absensi,
    metadata: "Checkin berhasil",
  });
});

//checkout
router.post("/checkout", async (req, res) => {
  const { nip } = req.body;
  const absensi = await AbsensiModel.create({
    users_nip: nip,
    status: "out",
  });
  res.status(200).json({
    data: absensi,
    metadata: "Checkout berhasil",
  });
});

module.exports = router;
