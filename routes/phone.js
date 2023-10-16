const { Router } = require("express");

const {
  getBuscar,
  obtenerTelefono,
  obtenerTelefonos,
  postBuscar,
} = require("../controllers/phone");

const router = Router();

router.get("/", obtenerTelefonos);

router.get("/detail/:id", obtenerTelefono);

router.get("/buscar", getBuscar);

router.post("/buscar", postBuscar);

module.exports = router;
