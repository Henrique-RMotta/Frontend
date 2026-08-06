function ex1 () {
alert("Digite a Hora");
let hora = parseInt(prompt("Qual a Hora ?")); 
if (hora < 12){
    hora ="manha"; 
} else if (hora >= 12 && hora < 18){
    hora = "tarde"; 
}else if (hora >= 18 && hora < 24) {
    hora = "noite";
}else {
    alert("Hora Inválida");
    
}

alert("Digite a Prioridade");
let prioridade = parseInt(prompt("Qual a Prioridade ? (0 a 10) "));
if (prioridade > 10 || prioridade < 0 ) {
    alert("Prioridade Inválida");
} else if (prioridade > 8 && hora === "manha" || hora === "tarde" ) {
    prioridade = "TAREFA CRÍTICA/URGENTE";
} else if (prioridade >= 7 && prioridade < 9 && hora === "manha" || hora === "tarde") {
    prioridade = "TAREFA IMPORTANTE";
} else if (prioridade > 0 && hora  === "noite"){
    prioridade = "TAREFA NÃO IMPORTANTE";
} else if (prioridade < 7 && hora === "manha" || hora === "tarde") {
    prioridade = "TAREFA NÃO IMPORTANTE";
}
return  alert (`${hora} - ${prioridade}`);
}


function ex2(){
    alert ("Digite as seguintes despesas e seu salario")
    let salario = parseFloat(prompt("Digite seu salario total"));
    let aluguel = parseFloat(prompt("Digite o valor do Aluguel"));
    let alimentacao = parseFloat(prompt("Digite o valor de Alimentacao"));
    let lazer = parseFloat(prompt("Digite o valor do lazer"));

    total = salario - (aluguel+alimentacao+lazer);
    switch (true) {
        case (total > 0): 
            alert ("Saldo Positivo");
            break;
        case (total = 0): 
            alert("No limite");
            break;
        case (total < 0): 
            alert("Saldo Negativo");
            break;
        default: 
            alert("Algo ta errado ae"); 
            break;
    }
}

function ex3 () {
        alert ("Digite seu nome")
        let nome = String(prompt("seu nome ?")); 
        let nomenovo = nome.trim();
        let nomeformatado = nomenovo.toUpperCase(); 
        let nomesplit  = nomeformatado.split(""); 
        let contador = 0;
        for (let i = 0; i < nomesplit.length; i++) {
            contador++;
        }
        alert (`${nomeformatado} número de letras  = ${contador}`);  


}
ex3();
function ex4() { 
    let diahoje = new Date();
    let diaev  = parseInt(prompt("dia"));
    let anoev  = parseInt(prompt("ano"));
    let mesev  = parseInt(prompt("mes"));
    let horaev  = parseInt(prompt("hora"));
    let minutosev  = parseInt(prompt("minutos"));
    let segundosev  = parseInt(prompt("segundos"));
    let milisev  = parseInt(prompt("milissegundos"));
    let diaevento = new Date(anoev,mesev,diaev,horaev,minutosev,segundosev,milisev);
    let tempo =  diaevento.getTime() -  diahoje.getTime(); 
    console.log(diahoje)
    console.log(diaevento) 
    let tempodia = tempo/86400000             
    alert(Math.ceil(tempodia));

    /* 
    let datahoje = new Date()// pega a data atual 
    let dataevento = new Data("2026-12-25")// exemplo natal de 2026 

    // diferença em milissegundos 
    let diferencaMs = dataEvento - dataHoje; 

    // conversao:ms->segundos->minutos->horas->dias
    let umdiaMs = 24 * 60 * 60 * 1000; 
    let diasFaltando  = Math.ceil(diferencaMs/umDiams);

    alert(`Faltam ${diasFaltando} dias para o compromisso`);

    */

}

function ex5() {
    let agendaHorarios = [8,12,25,15,-2,20]; 
    let contagemvalidos = 0;
    // for (let i =0 ; i< agendaHorarios.length; i++) {
    //     if (agendaHorarios[i] > 0 && agendaHorarios[i] < 23){
    //         console.log(`Compromisso Agendado em ${agendaHorarios[i]}h`)
    //         contagemvalidos ++; 
    //     } else {
    //         console.log(`Atenção: o horário ${agendaHorarios[i]}h `)
    //     }
    // }

    agendaHorarios.forEach((el) => {    
        if (el > 0 && el < 23){
          console.log(`Compromisso Agendado em ${el}h`)
           contagemvalidos ++; 
       } else {
          console.log(`Atenção: o horário ${el}h `)
  
}
    })
    console.log(contagemvalidos);
}

ex5();