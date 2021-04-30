import React, { useContext, useEffect, useState } from "react";
import format from "date-fns/format";
import "./index.css";

function FlightDetailPage({ match }) {
  // replace '/' with '-' to use the flight key as url
  const flightID = match.params.id.replace(/[-]/g, "/");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flightData, setFlightData] = useState([]);
  useEffect(() => {
    fetchPricesData();
  }, []);

  const fetchPricesData = () => {
    const options = {
      method: "POST",
    };

    fetch(`http://localhost:3030/api/flight/${match.params.id}`, options)
      .then((res) => res.json())
      .then((res) => {
        setFlightData(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };
  return (
    <div>
      {/*<p>{JSON.stringify(flightData.info)}</p>*/}
      {!loading && !error && (
        <div>
          <InfoTable data={flightData.info} />
          <PriceTable data={flightData.prices} />
        </div>
      )}
      {loading && <p>Loading data...</p>}
      {!loading && error && <p>Qualcosa si è rotto.... XD</p>}
    </div>
  );
}

function PriceTable({ data }) {
  if (data.length === 0)
    return <p>Non sono stati raccolti dati al momento... torna più tardi.</p>;

  return (
    <div className="table">
      <h3>Variazione prezzi del volo</h3>
      {/* <p>{JSON.stringify(data)}</p> */}
      <table className="table" border={1}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Prezzo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr>
              <td>{format(new Date(d.dataPrezzo), "d MMMM yyyy, HH:mm")}</td>
              <td>{d.prezzo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoTable({ data }) {
  if (!data) return;

  return (
    <div className="table">
      <h3>Info del volo</h3>
      {/* <p>{JSON.stringify(data)}</p> */}
      <table className="table" border={1}>
        <thead>
          <tr>
            <th>Partenza</th>
            <th>Destinazione</th>
            <th>Data Volo</th>
            <th>Orario Partenza</th>
            <th>Orario Arrivo</th>
            <th>Durata</th>
            <th>Numero volo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.città_origine}</td>
            <td>{data.città_destinazione}</td>
            <td>{format(new Date(data.data), "d MMMM yyyy")}</td>
            <td>{format(new Date(data.orarioPartenza), "HH:mm")}</td>
            <td>{format(new Date(data.orarioArrivo), "HH:mm")}</td>
            <td></td>
            <td>{data.numeroVolo}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FlightDetailPage;
