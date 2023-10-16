const fs = require("fs/promises");
const path = require("path");

const { crearPreferencia } = require("../util/mercadopago");


const p = path.join(path.dirname(require.main.filename), "data", "phones.json");


//Creación de preferencias
const crearPreferencias = async () => {
    const data = await fs.readFile(p, { encoding: "utf8" });
    const phones = JSON.parse(data);
    let modificadas = false;
    for (let index = 0; index < phones.length; index++) {
        const element = phones[index];
        const { id, nombre, precio, marca, local_imagen, url_imagen } = element;
        if (element.preference_id === "") {
            const { init_point, prefernce_id } = await crearPreferencia(id, nombre, precio, url_imagen, { id, nombre, precio, marca, local_imagen })
            element.preference_id = prefernce_id
            element.init_point = init_point
            modificadas = true;
        }

    }
    if (modificadas) {
        await fs.writeFile(p, JSON.stringify(phones, null, 2), { encoding: "utf8" })
    }


}


const actualizarPreferencia = async (preferenceId) => {
    const data = await fs.readFile(p, { encoding: "utf8" });
    const phones = JSON.parse(data);
    let modificada = false;
    for (let index = 0; index < phones.length; index++) {
        const element = phones[index];
        const { id, nombre, precio, marca, local_imagen, url_imagen } = element;
        if (element.preference_id == preferenceId) {
            const { init_point, prefernce_id } = await crearPreferencia(id, nombre, precio, url_imagen, { id, nombre, precio, marca, local_imagen })
            element.preference_id = prefernce_id
            element.init_point = init_point
            modificada = true;
            console.log(prefernce_id)
        }

    }
    if (modificada) {
        await fs.writeFile(p, JSON.stringify(phones, null, 2), { encoding: "utf8" })
    }


}

module.exports = { actualizarPreferencia, crearPreferencias }