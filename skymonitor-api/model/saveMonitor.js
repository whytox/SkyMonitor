const database = require('../model/database');

function insertMonitorIntoTable(flights_key, user_id, treshold) {
    var query_template = `INSERT IGNORE INTO monitoraggio
    (utente, volo, sogliaPrezzo) values`;

    var query_values = flights_key
        .map((f) => `('${user_id}', '${f}', '${treshold}')`)
        .join(",");

    var query = query_template + query_values;

    database.getConnection( (err, conn) => {
        conn.query(query, (err, row) => {
            conn.release();
            if (err) {
                throw err;
            }
            console.log("Monitor saved");
        })
    });
}

function saveMonitor(req, res, next) {
    var flights = req.body.flightsOut;

    if (req.body.roundTrip) flights = flights.concat(req.body.flightsIn);

    var flights_key = flights.map((f) => f.flightKey);

    try {
        insertMonitorIntoTable(flights_key, req.id, req.body.treshold);
        next();
    } catch (err) {
        res.status(500).send("DB error.");
        throw err;
    }
}

module.exports = saveMonitor;
