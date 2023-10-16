const fs = require("fs/promises");
const path = require("path");

const { consultarPreferenciaPorId } = require("../util/mercadopago");
const { actualizarPreferencia } = require("../util/preferencias_mp");
const { publicKey } = require("../constants");

const p = path.join(path.dirname(require.main.filename), "data", "phones.json");

const obtenerTelefonos = async (req, res) => {
  try {
    const data = await fs.readFile(p, {
      encoding: "utf8",
    });
    const phones = JSON.parse(data);
    const marcas = phones.map((x) => x.marca);
    res.render("home", {
      phones,
      marcas: [...new Set(marcas)],
      marca: "",
      precio_desde: undefined,
      precio_hasta: undefined,
      precios: false,
      view: "home",
    });
  } catch (error) {
    console.log(error);
  }
};

const obtenerTelefono = async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(p, {
    encoding: "utf8",
  });
  const phones = JSON.parse(data);
  let phone = phones.find((x) => x.id == id);

  const preference = await consultarPreferenciaPorId(phone.preference_id);

  if (preference === undefined) {
    await actualizarPreferencia(phone.preference_id);
    return res.redirect(req.path);
  }

  res.render("detail", {
    ...phone,
    view: "checkout",
    public_key: publicKey,
  });
};

const getBuscar = async (req, res) => {
  const { marca, precio_desde, precio_hasta } = req.query;
  const precios = precio_desde && precio_hasta ? true : false;
  try {
    const data = await fs.readFile(p, {
      encoding: "utf8",
    });
    let phones = JSON.parse(data);
    const marcas = phones.map((x) => x.marca);
    if (marca) {
      phones = phones.filter((x) => x.marca == marca);
    }
    if (precio_desde && precio_hasta) {
      phones = phones.filter((x) => {
        return x.precio >= precio_desde && x.precio <= precio_hasta;
      });
    }

    res.render("home", {
      phones,
      marcas: [...new Set(marcas)],
      marca,
      precio_desde,
      precio_hasta,
      precios,
      view: "search",
    });
  } catch (error) {
    console.log(error);
  }
};

const postBuscar = async (req, res) => {
  const { precio_desde, precio_hasta, marca } = req.body;
  const precios = precio_desde && precio_hasta ? true : false;
  try {
    const data = await fs.readFile(p, {
      encoding: "utf8",
    });
    let phones = JSON.parse(data);
    const marcas = phones.map((x) => x.marca);
    if (marca) {
      phones = phones.filter((x) => x.marca == marca);
    }

    phones = phones.filter((x) => {
      return x.precio >= precio_desde && x.precio <= precio_hasta;
    });

    res.render("home", {
      phones,
      marcas: [...new Set(marcas)],
      marca,
      precio_desde,
      precio_hasta,
      precios,
      view: "search",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBuscar,
  obtenerTelefono,
  obtenerTelefonos,
  postBuscar,
};
