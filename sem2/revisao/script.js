const sensoresIniciais = [
  {
    id: 1,
    nome: "Sensor Galpão A",
    tipo: "Temperatura",
    valor: 24.5,
    unidade: "°C",
    status: "normal",
  },
  {
    id: 2,
    nome: "Sensor Estufa 02",
    tipo: "Umidade",
    valor: 88.0,
    unidade: "%",
    status: "critico",
  },
  {
    id: 3,
    nome: "Sensor Compressor",
    tipo: "Pressão",
    valor: 6.2,
    unidade: "bar",
    status: "normal",
  },
  {
    id: 4,
    nome: "Sensor Câmara Fria",
    tipo: "Temperatura",
    valor: -2.1,
    unidade: "°C",
    status: "normal",
  },
  {
    id: 5,
    nome: "Sensor Almoxarifado",
    tipo: "Umidade",
    valor: 45.5,
    unidade: "%",
    status: "normal",
  },
  {
    id: 6,
    nome: "Sensor Caldeira",
    tipo: "Temperatura",
    valor: 98.4,
    unidade: "°C",
    status: "critico",
  },
];
let inputfiltro = document.querySelector("#opcaoSensor");

inputfiltro.addEventListener("change", (event) => {
  filtrarSensor(event.target.value);
});

atualizarStatus()
function filtrarSensor(tipo) {
    if (tipo === "Todas") {
        renderizarDashboard(sensoresIniciais)
    } else {
        let sensores = sensoresIniciais.filter((sensor) => sensor.tipo === tipo);
        renderizarDashboard(sensores);
    }
  
}

function renderizarDashboard(listaSensores) {
const div =  document.getElementById("grid-sensores")
  div.innerHTML = ""; 
  listaSensores.forEach((el) => {
let linhas = `
        <div class="card col" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${el.nome}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">
 <span class="badge ${el.status === "critico" ? 'bg-danger' : 'bg-success'} ${el.status === "critico" ? 'border border-2 border-dark' : ''}">
  ${el.status}
</span>
</h6>
    <p class="card-text">${el.valor}</p>
    <button class="btn btn-info">Ver Histórico</button>
  </div>
</div>`;

        div.insertAdjacentHTML('beforeend', linhas);

  });
let timestamp = new Date();
const horario = document.getElementById("horario");
horario.innerHTML = timestamp.toLocaleString('pt-BR');
}

function atualizarStatus() {
    const status = "Online"
    let statusHTML = document.getElementById("status")
    statusHTML.innerHTML = status

    if (status === "Online") {  
        statusHTML.classList.add("bg-success")
    } else {
        statusHTML.classList.add("bg-danger")
    }
}