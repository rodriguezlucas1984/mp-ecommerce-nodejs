const { request, response } = require("express");
const path = require("path");
const fs = require("fs/promises");

const { consultarPagoPorId } = require("../util/mercadopago");

const p = path.join(path.dirname(require.main.filename), "data", "pagos.json");

const getBackUrl = async (req = request, res = response) => {
  const {
    collection_id,
    collection_status,
    payment_id,
    status,
    external_reference,
    payment_type,
    merchant_order_id,
    preference_id,
    site_id,
    processing_mode,
    merchant_account_id,
  } = req.query;

  const pago = await consultarPagoPorId(payment_id);
  res.render("pago", {
    pago,
    estado: status,
    phone: pago.additional_info.items[0],
    view: "",
  });
};

webhookPago = async (req = request, res = response) => {
  const {
    action,
    api_version,
    date_created,
    id,
    live_mode,
    type,
    user_id,
    data,
  } = req.body;
  let pagos = new Array();
  try {
    if (type != "payment") {
      return res.status(200).json({
        msg: "No esperaba este tipo de notificacíon, pero esta todo bíen",
      });
    }
    const pago = await consultarPagoPorId(data.id);
    if (!pago)
      return res.status(500).json({
        msg: "Hubo un error al procesar el pago",
        error: "Pago invalido",
      });
    const dataString = await fs.readFile(p, { encoding: "utf-8" });
    pagos = JSON.parse(dataString);
    const nuevoPago = {
      id: data.id,
      notification_id: id,
      phone_id: pago.additional_info.items[0].id,
      monto: pago.transaction_amount,
      order_id: pago.order.id,
      creado: pago.date_created,
      aceptado: pago.date_approved,
      modificado: pago.date_last_updated,
      estado: pago.status,
      notificacion: { ...req.body },
    };

    //Existe pago
    const oldPagoIndex = pagos.findIndex((x) => x.id == data.id);
    if (oldPagoIndex > -1) {
      pagos[oldPagoIndex] = nuevoPago;
    } else {
      if (pagos.length > 99) {
        pagos.shift();
      }
      pagos.push(nuevoPago);
    }
    await fs.writeFile(p, JSON.stringify(pagos, null, 2));
    res.status(action == "payment.created" ? 201 : 200).json({
      msg:
        action == "payment.created"
          ? "Pago creado correctamente"
          : "Pago actualizado correctamente",
      error: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hubo un erro al procesar el pago...",
      error: error.toString(),
    });
  }
};

obtenerPagos = async (req,res) => {
  let pagos;
  try {
    const data = await fs.readFile(p, { encoding: "utf-8" });
    pagos = JSON.parse(data);
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).json({ msg: error.toString() });
  }
};

module.exports = { getBackUrl, webhookPago, obtenerPagos };
