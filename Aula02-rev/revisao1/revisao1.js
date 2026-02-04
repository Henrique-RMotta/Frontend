let background = document.getElementById("body");

function conversao() {
     let temperature = document.getElementById("temperature").value;
     temperature= ((1.8 * temperature) + 32);
     return temperature;
}
function mudarFundo(){
    let temperaturaConvert = conversao();
    if (temperaturaConvert >= 80) {
    background.style.backgroundColor = "orange";
    } else if (temperaturaConvert < 80) {
    background.style.backgroundColor= "lightskyblue";
}
}

