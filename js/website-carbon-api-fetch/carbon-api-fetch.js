// Elementi pagina
const txtEnergia = document.getElementById("energiaDispersa");
const txtgCO2rinn = document.getElementById("gCO2rinn");
const txtLCO2rinn = document.getElementById("LCO2rinn");
const txtgCO2retenaz = document.getElementById("gCO2retenaz");
const txtLCO2retenaz = document.getElementById("LCO2retenaz");

const APIerr = document.getElementById("APIerr");

// Nascondi il messaggio di errore
APIerr.style.display = "none";

// URL API
const url = `https://api.websitecarbon.com/site?url=https%3A%2F%2Fwww.wholegraindigital.com%2F`;
const url2 = "https://api.websitecarbon.com/data?bytes=1000&green=1";
const prova = "https://dog.ceo/api/breeds/image/random";

// Fethch API
function fetchData(){
    fetch("https://api.websitecarbon.com/site?url=https%3A%2F%2Fwww.google.it")
    .then(function(promise) {
        console.log(promise.json())
        if (promise.ok) {
            APIerr.style.display = "none";
            let json = promise.json();
            txtEnergia.innerText = json.statistics.energy.toFixed(2);
            txtgCO2rinn.innerText = json.statistics.co2.renewable.grams.toFixed(2);
            txtLCO2rinn.innerText = json.statistics.co2.renewable.litres.toFixed(2);
            txtgCO2retenaz.innerText = json.statistics.co2.grid.grams.toFixed(2);
            txtLCO2retenaz.innerText = json.statistics.co2.grid.litres.toFixed(2);
        }
        else {
            APIerr.style.display = "block"
        }
    })
    .catch(APIerr.style.display = "block");
}