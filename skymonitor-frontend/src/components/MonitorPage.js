import React from "react";
import "./index.css";
import {Link} from 'react-router-dom';
import AirportSelector from "./AirportSelector";
import RoundTripSelector from "./RoundTripSelector";
import DepartureDatePicker from "./DepartureDatePicker";
import FlightChecker from "./FlightChecker";
import format from "date-fns/format";
import Button from "@material-ui/core/Button";
import UserContext from "../API/currentUser";

const AIRPORTS_URL =
  "https://www.ryanair.com/api/locate/v1/autocomplete/airports" +
  "?phrase=&market=it-it";

class MonitorPage extends React.Component {
  static contextType = UserContext;

  defaultState = {
    originAirportOptions: [],
      destinationAirportOptions: [],
      originAirport: {},
      destinationAirport: {},
      availabilities: [],
      dateIn: null,
      dateOut: null,
      roundTrip: true,
      buttonClicked: false, // rename to 'searchCompleted'
      tripData: {},
      outFlights: [],
      inFlights: [],
      requestSubmitted: false
  };

  constructor(props) {
    super(props);
    
    this.history = props.history;

    this.state = this.defaultState;
  }

  componentDidMount() {
    let user = this.context;
    this.setState(user);
    fetch(AIRPORTS_URL)
      .then((res) => res.json())
      .then((res) => this.setState({ originAirportOptions: res }));
  }

  toggleRoundTrip = () => {
    this.setState({
      roundTrip: !this.state.roundTrip,
    });
  };

  monitorSelectedFlights = async () => {
    if (!this.state.user) {
      // TODO: HANDLE NOT LOGGED USER
      this.setState({response: "Not logged."});
      return;
    }
    /*
    ! MONITOR API REQUEST:
    TODO: prepare the body to send
    TODO: send it
    */

    // * send user token
    console.log(this.state);
    var body = {};
    body['token'] = this.state.user["token"];
    body['flightsOut'] = this.state.outFlights.filter(f => (f.selected));
    body['dateOut'] = this.state.dateOut;
    body['flightsIn'] = this.state.inFlights.filter(f => (f.selected));
    body['dateIn'] = this.state.dateIn;
    body["originAirport"] = this.state.originAirport;
    body["destinationAirport"] = this.state.destinationAirport;
    body['roundTrip'] = this.state.roundTrip;

    const options = {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    }
    var requestResponse = await fetch("http://localhost:3030/api/monitor", options)
    .then(r => r.text());
    console.log("%c SENDING: ", "color: purple");
    console.log(body);
    console.log("%c RECEIVING: ", "color: purple");   
    console.log(requestResponse);
    this.setState({...this.defaultState, response: requestResponse});
  };

  selectInFlight(event, value) {
    var updated = this.state.inFlights.map((f) => {
      if (f["flightKey"] === event.target.name) {
        f["selected"] = value;
        return f;
      }
      return f;
    });

    this.setState({
      inFlights: updated,
    });
  }

  selectOutFlight(event, value) {
    var updated = this.state.outFlights.map((f) => {
      if (f["flightKey"] === event.target.name) {
        f["selected"] = value;
        return f;
      }
      return f;
    });

    this.setState({
      outFlights: updated,
    });
  }

  searchFligths() {
    // creo nuovo div in cui stampo url per ottenere voli
    var flights_url =
      `https://www.ryanair.com/api/booking/v4/it-it/availability?` +
      `ADT=1&CHD=0&DateIn=${this.state.roundTrip ? this.state.dateIn : ""}` +
      `&DateOut=${this.state.dateOut}&Destination=${this.state.destinationAirport.code}` +
      `&Disc=0&INF=0&Origin=${this.state.originAirport.code}` +
      `&RoundTrip=${this.state.roundTrip}&TEEN=0&FlexDaysIn=0&FlexDaysBeforeIn=0` +
      `&FlexDaysOut=0&FlexDaysBeforeOut=0&ToUs=AGREED&IncludeConnectingFlights=false`;

    fetch(flights_url)
      .then((res) => res.json())
      .then((data) => {
        var outFlights = data["trips"][0]["dates"][0]["flights"];
        outFlights = outFlights.map((f) => ({ ...f, selected: false }));

        var inFlights = [];
        if (this.state.roundTrip) {
          inFlights = data["trips"][1]["dates"][0]["flights"];
          inFlights = inFlights.map((f) => ({ ...f, selected: false }));
        }

        this.setState({
          tripData: data,
          buttonClicked: true,
          outFlights: outFlights,
          inFlights: inFlights,
        });
      });
  }

  handleDateInChange(newDate) {
    if (this.isDateDisabled(newDate)) return;

    var formatted = format(newDate, "yyyy-MM-dd");
    this.setState({
      dateIn: formatted,
    });
  }

  handleDateOutChange(newDate) {
    if (this.isDateDisabled(newDate)) return;

    var formatted = format(newDate, "yyyy-MM-dd");
    this.setState({
      dateOut: formatted,
    });
  }

  handleOriginChange(newValue) {
    this.setState({
      originAirport: newValue,
      destinationAirport: {},
    });

    this.updateDestinationAirportOptions(newValue);
  }

  handleDestinationChange(newValue) {
    console.log(newValue);

    if (!newValue || !this.state.originAirport)
      // empty availabilities
      return this.setState({
        availabilities: [],
        destinationAirport: newValue,
      });

    var AVAILABILITIES_URL =
      "https://www.ryanair.com/api/farfnd/3/" +
      "oneWayFares/" +
      this.state.originAirport.code +
      "/" +
      newValue.code +
      "/availabilities";

    fetch(AVAILABILITIES_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          availabilities: data,
          destinationAirport: newValue,
        });
      });
  }

  updateDestinationAirportOptions(originAirport) {
    if (originAirport === null)
      return this.setState({
        destinationAirportOptions: [],
      });

    const ARRIVAL_AIRPORT_URL =
      "https://www.ryanair.com/api/locate/v1/" +
      "autocomplete/routes?arrivalPhrase=&departurePhrase=" +
      originAirport.code +
      "&market=it-it";

    fetch(ARRIVAL_AIRPORT_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("data retrived");
        this.setState({
          destinationAirportOptions: data.map((item) => item.arrivalAirport),
        });
      });
  }

  isDateDisabled(date) {
    // disabled if not available
    var formatted = format(date, "yyyy-MM-dd");
    return this.state.availabilities.indexOf(formatted) === -1;
  }

  allParametersSetted() {
    // not(A) && not(B) = not(A || B)
    var allSetted =
      this.state.originAirport &&
      this.state.destinationAirport &&
      this.state.dateOut &&
      (!this.state.roundTrip || this.state.dateIn);
    return allSetted;
  }

  render() {
    if (!this.state.user) 
      return (
        <p>Per monitorare un volo devi prima 
          <br />
          <Link to="/register">registrarti</Link> o fare il <Link to="/login"> login</Link>.</p>
      )
    if (!this.state.response)
    return (
      <div id="journey-selection" class="card-div">
        <h1 style={{ textAlign: "center" }}>Cerca un volo</h1>

        <div id="airports-picker">
          <h2>Seleziona aeroporti</h2>

          <div className="input-container">
            <AirportSelector
              id="origin-input"
              options={this.state.originAirportOptions}
              label="Partenza da"
              onChange={(e, v, r) => this.handleOriginChange(v)}
              value={this.state.originAirport}
            />
          </div>

          <div className="input-container">
            <AirportSelector
              id="destination-input"
              options={this.state.destinationAirportOptions}
              label="Destinazione"
              onChange={(e, v, r) => this.handleDestinationChange(v)}
              value={this.state.destinationAirport}
            />
          </div>
        </div>

        <div id="dates-picker">
          <h2>Seleziona date viaggio</h2>

          <RoundTripSelector
            checked={this.state.roundTrip}
            onChange={this.toggleRoundTrip}
          />

          <br />

          <DepartureDatePicker
            dateOutLabel="Data partenza"
            dateOut={this.state.dateOut}
            onDateOutChange={(v) => this.handleDateOutChange(v)}
            shouldDisableDate={(date) => this.isDateDisabled(date)}
            dateInLabel="Data ritorno"
            dateIn={this.state.dateIn}
            onDateInChange={(v) => this.handleDateInChange(v)}
            dateInDisabled={!this.state.roundTrip}
          />
        </div>

        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            style={{ width: 100 }}
            disabled={
              !(
                this.state.originAirport &&
                this.state.destinationAirport &&
                this.state.dateOut &&
                (!this.state.roundTrip || this.state.dateIn)
              )
            }
            onClick={() => this.searchFligths()}
          >
            Cerca
          </Button>
        </div>

        <div
          id="flights-selection"
          style={{ display: this.state.buttonClicked ? "block" : "none" }}
        >
          {/*<pre>{JSON.stringify(this.state.tripData, undefined, 2)}</pre>*/}
          {/* Selettore voli andata */}
          <div id="out-flights">
            <h3>Voli andata del {this.state.dateOut}</h3>
            {/*<pre>{JSON.stringify(this.state.outFlights, undefined, 2)}</pre>*/}

            <FlightChecker
              label={`Voli da 
              ${this.state.originAirport.name}
               a ${this.state.destinationAirport.name}`}
              selections={this.state.outFlights}
              toggleSelection={(e, f) => this.selectOutFlight(e, f)}
            />
          </div>

          {/* Selettore voli ritorno */}
          {this.state.roundTrip && (
            <div id="in-flights">
              <h3>Voli ritorno del {this.state.dateIn}</h3>
              {/*<pre>{JSON.stringify(this.state.inFlights, undefined, 2)}</pre>*/}

              <FlightChecker
                label="Seleziona voli di ritorno"
                selections={this.state.inFlights}
                toggleSelection={(e, f) => this.selectInFlight(e, f)}
              />
            </div>
          )}

          <div className="button-container">
            <Button
              variant="contained"
              color="primary"
              style={{ width: 100 }}
              disabled={false}
              onClick={this.monitorSelectedFlights}
            >
              Monitora
            </Button>
          </div>
        </div>
      </div>
    );
    else 
      return (
        <p>Volo aggiunto, per vedere i suoi dati vai su 
          <br />
          <Link to="/flights">i tuoi voli</Link>
        </p>
      );
  }
}

export default MonitorPage;
