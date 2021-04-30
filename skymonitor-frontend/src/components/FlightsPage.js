import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import UserContext from "../API/currentUser";
import format from "date-fns/format";
import it from 'date-fns/locale/it'


function FlightPage() {
  const { user } = useContext(UserContext);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // to redirect the user
  const history = useHistory();

  // When this component load:
  // send a request with user's token
  // to fetch his flights
  useEffect(() => {
    const abortController = new AbortController();

    if (!user) {
      history.push("/login");
    }

    var options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
      signal: abortController.signal,
    };

    fetch("http://localhost:3030/api/users/flights", options)
      .then((res) => res.json())
      .then((res) => {
        setFlights(res);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div class="table">
      {user && <h3>Ciao {user.name}, ecco i voli che stai monitorando.</h3>}
      {!loading && !error && <FlightTable flights={flights} />}
      {!loading && error && <p>Qualcosa si è rottooo... Dx</p>}
      {loading && <p>Caricamento dei voli. :)</p>}
    </div>
  );
}

function FlightTable({ flights }) {
  console.log(flights);
  if (flights.lenght === 0) {
    return (
      <p>
        Non ci sono voli monitorati. Vai
        <Link path="/monitor">qui</Link>
        per aggiungerli.
      </p>
    );
  }
  return (
    <table class="table" border="1">
      <thead>
        <th>Origine</th>
        <th>Destinazione</th>
        <th>Numero Volo</th>
        <th>Data Partenza</th>
        <th>Orario Partenza</th>
        <th>Link Prezzi</th>
      </thead>
      <tbody>
      {flights.map((f) => (
        <FlightRow key={f.idVolo} flight={f} />
      ))}
      </tbody>
    </table>
  );
}

function FlightRow({ flight }) {
  const label = `${flight.città_origine} -> 
  ${flight.città_destinazione}
  del giorno ${format( new Date(flight.data), "d MMMM")}
   alle ${format( new Date(flight.orarioPartenza), "HH:MM")}`;

  return (
    <>
    <tr>
    <td>
      {flight.città_origine}
    </td>
    <td>
      {flight.città_destinazione}
    </td>
    <td>
      {flight.numeroVolo}
    </td>
    <td>
    {format( new Date(flight.data), "d MMMM")}
    </td>
    <td>
    {format( new Date(flight.orarioPartenza), "HH:MM", {locale: it})}
    </td>
    <td>
      <Link to={`/flightDetail/${flight.idVolo.replace(/[/]/g, '-')}`}>
      Dettagli Volo
      </Link>
    </td>
    </tr>
   
    </>
  );
}


export default FlightPage;
