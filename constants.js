// Servidor express
const PORT = process.env.PORT;

// Credenciales de vendedor
const accessToken = process.env.ACCESS_TOKEN;
const integratorId = process.env.INTEGRATOR_ID;

// Clave publica para el SDK Client-side
const publicKey = process.env.PUBLIC_KEY;

// Referencia externa
const externalReference = process.env.EXTERNAL_REFERENCE;

// Datos usuario test- pagador
const testUserEmail = process.env.TEST_USER_EMAIL;
const testUserName = process.env.TEST_USER_NAME;
const testUserSurName = process.env.TEST_USER_SURNAME;

// Back-urls
const backcUrlPending = process.env.BACK_URL_PENDING;
const backcUrlSuccess = process.env.BACK_URL_SUCCESS;
const backcUrlFailure = process.env.BACK_URL_FAILURE;

// Notificaciones Webhook
const notificactionUrl = process.env.NOTIFICATION_URL;

module.exports = {
  PORT,
  accessToken,
  backcUrlFailure,
  backcUrlPending,
  backcUrlSuccess,
  externalReference,
  externalReference,
  integratorId,
  notificactionUrl,
  publicKey,
  testUserEmail,
  testUserName,
  testUserSurName,
};
