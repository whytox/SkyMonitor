const database = require('../model/database');
const CronJob = require('cron').CronJob;
const fetch = require('node-fetch');

var crawlPrices = new CronJob('52 * * * *', crawlFlightPrice);
crawlPrices.start();

async function crawlFlightPrice() {

    // 1. Lista dei voli monitorati di cui aggiornare il prezzo
    // 2. Aggiunge il prezzo reale dei voli
    // 3. Aggiunge l'ultimo prezzo memorizzato
    // 4. confronta i due prezzi e se diversi memorizza quello reale

    console.log("Crawling prices.");

    console.log("Flights to crawl:");

    fetchFlightToCrawl()
    .then(flights => {flights.forEach(f => updatePrice(f))})
    .catch();

    // fetchFlight and then updatePrice
    //var flights = await fetchFlightToCrawl(updatePrice);

};

function fetchFlightToCrawl(onComplete, onReject) {
    return new Promise(function (resolve, reject) {
        var fetch_flights = `SELECT *
        FROM volomonitorato`;

        database.getConnection((error, conn) => {

            if (error) reject(error);
            conn.query(fetch_flights, (err, rows) => {
                conn.release();
                if (err) reject(err);

                // * rows is an array of flight object
                //console.log(rows);
                //rows.forEach(f => updatePrice(f));
                resolve(rows);
            })

        });
    });
    
}

// * Flight structure is the following:
/*
    * idVolo
    * origineIATA
    * destinazioneIATA
    * data in formato datetime
    * orarioPartenza/Arrivo
    * numeroVolo
*/
function updatePrice(flight) {
    getPrice(flight)    // scarica prezzo attuale
    .then(fetchLastPrice)   // scarica ultimo prezzo memorizzato
    .then(compareAndUpdatePrice)    // e li confronta
    .then(f => console.log(f));
}

async function getPrice(flight) {
    return new Promise( function (resolve, reject) {
        var flightInfoURL = `https://www.ryanair.com/api/booking/v4/it-it/availability?` +
        `ADT=1&CHD=0&&DateOut=${flight.data.toString().slice(0,10)}&Destination=${flight.destinazioneIATA}` +
        `&Disc=0&INF=0&Origin=${flight.origineIATA}` +
        `&RoundTrip=false&TEEN=0&FlexDaysIn=0&FlexDaysBeforeIn=0` +
        `&FlexDaysOut=0&FlexDaysBeforeOut=0&ToUs=AGREED&IncludeConnectingFlights=false`;

        //console.log(flightInfoURL);

        fetch(flightInfoURL).then(r => r.json())
        .then(function(flightInfo) {
            //console.log(flightInfo);
            if (!flightInfo) throw new Error("Couldn't fetch flight price");
            var flights = flightInfo.trips[0].dates[0].flights;
            if (flights.length === 0) {
                // ! QUESTO VOLO NON è DISPONIBILE
                console.log(flight.idVolo + " non disponibile")
                resolve({...flight, price:-1});
                return;
            }  

            if (flights[0].faresLeft === 0) {
                // ! TUTTO PRENOTATO
                console.log(flight.idVolo + " pieno");
                resolve({...flight, price:-2});
                return;
            }

            var newPrice = flights[0].regularFare.fares[0].amount;
            console.log(flight.idVolo + " trovato prezzo: " +newPrice);
            // risolve aggiungendo campo price all'oggetto flight
            // che poi sarà usato dalla promessa successiva
            resolve({...flight, price:newPrice});
            return;
        });
    });    
}

function fetchLastPrice(flight) {
    return new Promise(function (resolve, reject) {
        database.getConnection((error, conn) => {

            if (error) reject(error);
            var fetch_price = `SELECT prezzo
            FROM storicoprezzi
            WHERE volo='${flight.idVolo}'
            AND dataprezzo IN (
                SELECT max(dataprezzo)
                FROM storicoprezzi
                WHERE volo='${flight.idVolo}')`
            conn.query(fetch_price, (err, rows) => {
                conn.release();
                if (err) reject(err);

                // * The resulted row contains
                // * a single object {'prezzo': x}
                //console.log(rows[0]);
                //console.log("lastprice stringified: " + JSON.stringify(rows[0]));
                //rows.forEach(f => updatePrice(f));

                resolve({...flight, lastPrice: Number(rows[0].prezzo)});
            })

        });
    })
}

function compareAndUpdatePrice(flight) {
    return new Promise(function (resolve, reject) {
        if (flight.price === flight.lastPrice) {
            resolve("STESSO PREZZO PER " + flight.idVolo);
            return;
        }
        //console.log(flight.price + ' is different from ' + flight.lastPrice);
            
        database.getConnection((error, conn) => {

            if (error) reject(error);
            var save_price = `INSERT INTO storicoprezzi
            (volo, prezzo) VALUES
            ('${flight.idVolo}', ${flight.price})`;+

            conn.query(save_price, (err, rows) => {
                conn.release();
                if (err) reject(err);
                //console.log(rows);
                //rows.forEach(f => updatePrice(f));
                resolve("PREZZO AGGIORNATO PER " + flight.idVolo);
            })

        });
    })
}