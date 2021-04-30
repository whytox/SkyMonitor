const router = require('express').Router();
const database =  require('../model/database');

function fetchPrices(req, res, next) {
    // * FETCH FLIGTH PRICES AND SEND IT BACK
    console.log(req.params.flightKey);
    // Replace '-' with '/'
    //(we can't have id with '/' so we replaced it
    // with '-')
    var real_flight_key = req.params.flightKey.replace(/[-]/g, '/');
    var fetch_price = `SELECT dataPrezzo, prezzo
    FROM storicoprezzi
    WHERE volo='${real_flight_key}'`;

    database.getConnection((error, conn) => {
        if (error) {res.status(500).send("DB error"); throw error;}

        conn.query(fetch_price, (err, rows) => {
            conn.release();
            if (err) {res.status(500).send("DB error"); throw err;}
            
            req.data.prices = rows;
            res.header('Content-type', 'application/json').send(JSON.stringify(req.data));
        }

    )});
}

function fetchGenericInfo(req, res, next) {
     // * FETCH FLIGHT GENERIC INFO
     var real_flight_key = req.params.flightKey.replace(/[-]/g, '/');
     var fetch_info = `
     SELECT t1.idVolo, t1.data, orarioArrivo, orarioPartenza, t1.numeroVolo,
         destinazioneIATA, origineIATA,
         città_origine, nazione_origine, città_destinazione, nazione_destinazione
     FROM 
         (SELECT V.idVolo, V.data, orarioArrivo, orarioPartenza, numeroVolo, A.codiceIATA as origineIATA, città AS città_origine, nazione AS nazione_origine
         FROM volomonitorato AS V JOIN aeroporto AS A
         WHERE A.codiceIATA=V.origineIATA
         AND V.idvolo='${real_flight_key}')t1
         JOIN
         (SELECT V.idVolo, A.codiceIATA as destinazioneIATA, città AS città_destinazione, nazione AS nazione_destinazione
         FROM volomonitorato AS V JOIN aeroporto AS A
         WHERE A.codiceIATA=V.destinazioneIATA
         AND V.idVolo='${real_flight_key}') t2
         ON t1.idVolo=t2.idVolo`;

    database.getConnection((error, conn) => {
        if (error) {res.status(500).send("DB error"); throw error;}
    
        conn.query(fetch_info, (err, rows) => {
            conn.release();
            if (err) {res.status(500).send("DB error"); throw err;}
                
            req.data = {info: rows[0]};
            next();
        }
    )});
}

router.post('/:flightKey', fetchGenericInfo, fetchPrices);

module.exports = router;
