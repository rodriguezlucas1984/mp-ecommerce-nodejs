(function () {
  const public_key = document.getElementById("public_key").value;
  const mp = new MercadoPago(public_key);
  const bricksBuilder = mp.bricks();
  const preference_id = document.getElementById("preference_id").value;

  const divEsperando = document.getElementById("esperando-boton");

  divEsperando.innerHTML = `
        <p style="margin:5%;padding: 3%;width:300px;background-color:#EEF0D0;font-size:25px;color:#8A43C6;">Espere que se renderize el boton de pago...</p>
    `;

  bricksBuilder
    .create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preference_id,
        redirectMode: "modal",
      },
      callbacks: {
        onError: (error) => {
          console.log(error);
        },
      },
    })
    .then(() => {
      console.log("Boton renderizado");
      divEsperando.innerHTML = "";
    })
    .catch(console.log);
})();
