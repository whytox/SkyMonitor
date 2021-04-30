import React from 'react';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DepartureDatePicker({
    dateOut, onDateOutChange, shouldDisableDate, dateIn,
    onDateInChange, dateInDisabled
}) {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} format="yyyy-MM-dd">
          <DatePicker
            label="Data Partenza"
            value={dateOut}
            onChange={onDateOutChange}
            variant='inline'
            format="yyyy-MM-dd"
            shouldDisableDate={shouldDisableDate}
            clearable="true"
            style={{ width: 300}}
          />
          <br />
          <DatePicker
            label="Data Ritorno"
            value={dateIn}
            onChange={onDateInChange}
            variant='inline'
            format="yyyy-MM-dd"
            shouldDisableDate={shouldDisableDate}
            clearable="true"
            disabled={dateInDisabled}
            style={{ width: 300}}
          />
        </MuiPickersUtilsProvider>
    );
}

export default DepartureDatePicker;