const danger = document.querySelectorAll(".danger");
const success = document.querySelectorAll(".success");
const dangerr = document.querySelectorAll(".danger");
const alerts = document.querySelector(".alerts");

/*Tempo do alerta*/
const tempo = setTimeout(() => {
    alerts.remove();
}, 12000);

alerts.addEventListener("onload", () => tempo);
 

const removerAlerta = (event) => {
  const alerta = event.currentTarget;
  alerta.remove();
}

danger.forEach((alerta) => {
  alerta.addEventListener("click", (e) => removerAlerta(e)) ;
});

success.forEach((alerta) => {
  alerta.addEventListener("click", (e) => removerAlerta(e));
});
