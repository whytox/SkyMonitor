const database = require("./database");

function fetchFlights(req, res, next) {
  var user_id = req.id;

  var fetch_flights = `
    SELECT t1.idVolo, t1.data, orarioArrivo, orarioPartenza, t1.numeroVolo,
	    destinazioneIATA, origineIATA,
	    città_origine, nazione_origine, città_destinazione, nazione_destinazione
    FROM 
	    (SELECT V.idVolo, V.data, orarioArrivo, orarioPartenza, numeroVolo, A.codiceIATA as origineIATA, città AS città_origine, nazione AS nazione_origine
	    FROM volomonitorato AS V JOIN aeroporto AS A
	    WHERE A.codiceIATA=V.origineIATA
	    AND V.idVolo IN (
		    SELECT m.volo
		    FROM monitoraggio m
		    WHERE m.utente=${req.id})
	    ) t1
	    JOIN
        (SELECT V.idVolo, A.codiceIATA as destinazioneIATA, città AS città_destinazione, nazione AS nazione_destinazione
        FROM volomonitorato AS V JOIN aeroporto AS A
        WHERE A.codiceIATA=V.destinazioneIATA
        AND V.idVolo IN (
            SELECT m.volo
            FROM monitoraggio m
            WHERE m.utente=${req.id})
        ) t2
        ON t1.idVolo=t2.idVolo`;

    database.getConnection((error, conn) => {
        if (error) {throw error; res.status(500).send("DB error");}

        conn.query(fetch_flights, (err, row, fields) => {
            conn.release();
            if (err) {throw err; res.status(500).send("DB error");}
            console.log(row);

            
            res.header('Content-type', 'application/json').send(JSON.stringify(row));
        })
    });
    

}

module.exports = fetchFlights;
