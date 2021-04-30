const database = require("./database");

/* table names
const MONITORED_FLIGHT = 
*/

function insertFlightsIntoTable({ flights, date, origin, destination }) {
  var flights_values = flights
    .map(
      (f) => `('${f.flightKey}', '${origin.code}', '${destination.code}',
                '${date}', '${f.time[0]}', '${f.time[1]}', '${f.flightNumber}')`
    )
    .join(",");

  var save_flights_query = `INSERT IGNORE INTO volomonitorato 
    (idVolo, origineIATA, destinazioneIATA, data, orarioPartenza, orarioArrivo, numeroVolo) 
    values ${flights_values}`;

  database.getConnection((error, conn) => {
    conn.query(save_flights_query, (err) => {
      conn.release();
      if (err)
        throw err;
      console.log("Flights saved");
    });
  });
}

function insertAirportsIntoTable({ origin, destination }) {
  var airports_query = `INSERT IGNORE INTO aeroporto
    (codiceIATA, città, nazione) values
    ('${origin.code}', '${origin.city.name}', '${origin.country.name}'),
    ('${destination.code}', '${destination.city.name}', '${destination.country.name}')`;

  database.getConnection((error, conn) => {
    if (error) 
      throw error;

    conn.query(airports_query, (err) => {
      conn.release();
      if (err) 
        throw err;

      console.log("Airport saved");
    });
  });
}

function saveFlights(req, res, netx) {
  // * SAVE AIRPORTS
  var origin = req.body.originAirport;
  var destination = req.body.destinationAirport;
  var airports = { origin, destination };

  // * SAVE FLIGHTS
  console.log(req.body);
  var flightsIn = req.body.flightsIn;
  var flightsOut = req.body.flightsOut;
  var dateIn = req.body.dateIn;
  var dateOut = req.body.dateOut;


  try {
    insertAirportsIntoTable(airports);
    if (req.body.flightsOut.length !== 0)
    insertFlightsIntoTable({
      flights: flightsOut,
      date: dateOut,
      origin: origin,
      destination: destination,
    });
    if (req.body.roundTrip && req.body.flightsIn.length !== 0)
        insertFlightsIntoTable({
        flights: flightsIn,
        date: dateIn,
        origin: destination,
        destination: origin,
        });
    netx();
  } catch (error) {
    res.status(500).send("DB error");
    throw error;
  }

}

module.exports = saveFlights;
