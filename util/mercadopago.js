// SDK de Mercado Pago
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

const {
  accessToken,
  integratorId,
  externalReference,
  testUserName,
  testUserSurName,
  testUserEmail,
  backcUrlPending,
  backcUrlSuccess,
  backcUrlFailure,
  notificactionUrl,
} = require("../constants");

// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: accessToken,
  options: { integratorId: integratorId },
});

const preference = new Preference(client);
const payment = new Payment(client);

const crearPreferencia = async (id, titulo, precio, imagen, metadata) => {
  // Crea un objeto de preferencia
  let preferencia = {
    external_reference: externalReference,
    items: [
      {
        id,
        title: titulo,
        picture_url: imagen,
        unit_price: precio,
        quantity: 1,
        category_id: "phones",
        description: "Dispositivo móvil de Tienda e-commerce",
      },
    ],

    payment_methods: {
      excluded_payment_methods: [
        {
          id: "visa",
        },
      ],

      installments: 6,
    },
    payer: {
      name: testUserName,
      surname: testUserSurName,
      email: testUserEmail,

      phone: {
        area_code: "351",
        number: 7123456,
      },
      address: {
        zip_code: "5014",
        street_name: "Calle Falsa",
        street_number: 123,
      },
    },
    back_urls: {
      pending: backcUrlPending,
      success: backcUrlSuccess,
      failure: backcUrlFailure,
    },
    auto_return: "approved",
    notification_url: notificactionUrl,
    metadata: metadata ? { ...metadata } : {},
  };

  try {
    const response = await preference.create({ body: { ...preferencia } });

    return {
      prefernce_id: response.id,
      init_point: response.init_point,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const consultarPreferenciaPorId = async (id) => {
  let preferencia;
  try {
    preferencia = await preference.get({ preferenceId: id });
  } catch (error) {
    console.log(error);
  }
  return preferencia;
};

const consultarPagoPorId = async (id) => {
  let pago;
  try {
    pago = await payment.get({ id: id });
  } catch (error) {
    console.log(error);
  }
  return pago;
};
module.exports = {
  crearPreferencia,
  consultarPreferenciaPorId,
  consultarPagoPorId,
};
