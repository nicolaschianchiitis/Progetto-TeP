// Elementi pagina
const txtDataInizio = document.getElementById("data-inizio");
const txtDataFine = document.getElementById("data-fine");
const txtMisura = document.getElementById("misura");
const txtMisurazioniTot = document.getElementById("misurazioniTot");
const APIerr = document.getElementById("APIerr");

// Nascondi il messaggio di errore
APIerr.style.display = "none";

// URL API e parametri della richiesta
const url = 'https://api.openaq.org/v2/averages?temporal=day&parameters_id=5&date_to=2024-05-24T09%3A00%3A00Z&date_from=2024-05-01T09%3A00%3A00Z&locations_id=8290&spatial=location&limit=100&page=1';
const options = {mode: 'cors', method: 'GET', headers: {accept: 'application/json'}};

// Fethch API
function fetchData(){
    APIerr.style.display = "none";
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        // Ottengo le misurazioni
        let misurazioni = data.results;
        // Ottengo, formatto e scrivo le date nella pagina
        // Data d'inzio misurazioni
        let dataInizio = new Date(misurazioni[0].day);
        let dataInizioFormattata = `${(dataInizio.getDate() < 10 ? '0' + dataInizio.getDate() : dataInizio.getDate())}`
            + `/${((dataInizio.getMonth() + 1) < 10 ? '0' + (dataInizio.getMonth() + 1) : (dataInizio.getMonth() + 1))}`
            + `/${dataInizio.getFullYear()}`;
        txtDataInizio.innerText = dataInizioFormattata;
        // Data di fine misurazioni
        let dataFine = new Date(misurazioni[misurazioni.length - 1].day);
        let dataFineFormattata = `${(dataFine.getDate() < 10 ? '0' + dataFine.getDate() : dataFine.getDate())}`
            + `/${((dataFine.getMonth() + 1) < 10 ? '0' + (dataFine.getMonth() + 1) : (dataFine.getMonth() + 1))}`
            + `/${dataFine.getFullYear()}`;
        txtDataFine.innerText = dataFineFormattata;
        // Calcolo media totale misurazioni e la scrivo nella pagina, approssimando a 2 cifre decimali
        let mediaMisurazioni = 0.0;
        misurazioni.forEach(dato => mediaMisurazioni += dato.average);
        mediaMisurazioni /= misurazioni.length;
        txtMisura.innerText = mediaMisurazioni.toFixed(2);
        // Calcolo numero di misurazioni totali e scrittura nella pagina
        let numeroMisurazioni = 0;
        misurazioni.forEach(dato => numeroMisurazioni += dato.measurement_count);
        txtMisurazioniTot.innerText = numeroMisurazioni;
    })
    .catch(error => {
        if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
            APIerr.style.display = "block";
            console.error("Errore CORS: controlla la configurazione del server e assicurati che l'API supporti CORS.");
        } else {
            console.error(error);
        }
    });
}

/* .then(data => {
    if (promise.ok) {
        APIerr.style.display = "none";
        let misurazioni = data.results;
    }
    else {
        APIerr.style.display = "block"
    }
}) */