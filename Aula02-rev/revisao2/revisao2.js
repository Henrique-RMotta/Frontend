function atualizarNome() {
    let nome = document.getElementById("nome").value;
    let cartaonome = document.getElementById("cartaonome").innerHTML = nome;
}

function atualizarCargo() {
    let cargo = document.getElementById("cargo").value;
    let cartaocargo = document.getElementById("cartaocargo").innerHTML = cargo;

}

function atualizarCor() {
    let cor = document.getElementById("cor").value;
    let cartaocor = document.getElementById("cartao").style.backgroundColor = cor;
}
