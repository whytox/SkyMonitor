import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import format from 'date-fns/format';

function FlightChecker({label, selections, toggleSelection}) {

    function getFlightLabel(flight) {
        var flightTime = format(new Date(flight.time[0]), "HH:MM");
        var label = `${flight.flightNumber} alle ore ${flightTime}`;
        console.log(flight);
        return label;
    }

    return (
        <FormControl required component="fieldset">
            <FormLabel>{label}</FormLabel>

                <FormGroup>
                    {selections.map( (flight) =>
                        (<FormControlLabel
                            key={flight.flightKey}
                            control={<Checkbox checked={flight["selected"]} onChange={toggleSelection}  name={flight.flightKey}/>}
                            label={getFlightLabel(flight)}
                        />)
                )}
        </FormGroup>
        </FormControl>
    );
}
export default FlightChecker;