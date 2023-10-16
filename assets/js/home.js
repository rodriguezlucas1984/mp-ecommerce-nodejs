(function () {
    const form_precio = document.getElementById("form-precio");
    const boton_ver_form = document.getElementById("as-accordion-header-button1");
    const precio_desde = document.getElementById("precio-desde")
    const precio_hasta = document.getElementById("precio-hasta")

    const checkNumber = (ev)=> {
        const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
        return !ev.key.match(regex) && ev.preventDefault();
    }

    boton_ver_form.addEventListener('click', function (ev) {
        form_precio.hidden = !form_precio.hidden
    })

    precio_desde.addEventListener('keydown', checkNumber)
    precio_hasta.addEventListener('keydown', checkNumber)

})();