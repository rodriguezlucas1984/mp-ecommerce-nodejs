const { Router } = require("express");

const { getBackUrl, webhookPago, obtenerPagos } = require("../controllers/pago");

const router = Router();

router.get("/pago", getBackUrl);

router.post("/webhook/mercadopago", webhookPago);

router.get("/api/pagos",obtenerPagos)

module.exports = router;
