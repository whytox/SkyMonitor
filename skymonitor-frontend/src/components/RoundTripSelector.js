import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function RoundTripSelector({checked, onChange}) {

    return (
        <FormControlLabel
        control={<Switch
                id="round-trip-switch"
                label="Andata e ritorno"
                color="primary"
                checked={checked}
                onChange={onChange}
              />}
        label="Andata e ritorno"
        labelPlacement="start"
        />
    );
}

export default RoundTripSelector;