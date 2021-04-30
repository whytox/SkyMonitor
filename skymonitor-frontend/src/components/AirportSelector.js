import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function AirportSelector({id, options, label, onChange, value}) {
    
    return (
    <Autocomplete
        id={id}
        options={options}
        getOptionLabel={(option) => option.name}
        style={{ width: 300}}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        onChange={onChange}
        value={value}
    />
    );
}

export default AirportSelector;