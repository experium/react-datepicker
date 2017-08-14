import React from 'react';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

const Example = () => (
    <div className="layout">
        <div className="datepicker-wrapper">
            <DatePicker
                input={{onChange: (value) => console.log('change date input - ', value)}}
                format="DD.MM.YYYY"
                mask="11.11.1111"
                placeholder="datepicker placeholder"
            />
        </div>
        <div className="timepicker-wrapper">
            <TimePicker
                input={{onChange: (value) => console.log('change time input - ', value)}}
                format="HH:mm"
                mask="11:11"
                placeholder="timepicker placeholder"
            />
        </div>
    </div>
);

export default Example;
