import React, { Component } from 'react';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import { path, is } from 'ramda';

const getValue = (value) => is(Object, value) ? path(['target', 'value'], value) : value;

class Example extends Component {
    state = {
        datepickerValue: null,
        timepickerValue: null
    }

    changeDatePickerValue = (value) => {
        this.setState({
            datepickerValue: getValue(value)
        });
    }

    changeTimePickerValue = (value) => {
        this.setState({
           timepickerValue: getValue(value)
        });
    }

    render() {
        return(
            <div className="layout">
                <h1>Demo page</h1>
                <div className="datepicker-wrapper">
                    <h2>DatePicker</h2>
                    <DatePicker
                        input={{onChange: this.changeDatePickerValue, value: this.state.datepickerValue}}
                        format="DD.MM.YYYY"
                        placeholder="DD.MM.YYYY"
                    />
                </div>
                <div className="timepicker-wrapper">
                    <h2>TimePicker</h2>
                    <TimePicker
                        input={{onChange: this.changeTimePickerValue, value: this.state.timepickerValue}}
                        format="HH:mm"
                        placeholder="HH:mm"
                    />
                </div>
                <div className="datepicker-wrapper">
                    <h2>Disabled mode</h2>
                    <DatePicker
                        input={{onChange: this.changeDatePickerValue, value: this.state.datepickerValue}}
                        format="DD.MM.YYYY"
                        placeholder="DD.MM.YYYY"
                        disabled
                    />
                </div>
                <div className="timepicker-wrapper">
                    <h2>TimePicker disabled</h2>
                    <TimePicker
                        input={{onChange: this.changeTimePickerValue, value: this.state.timepickerValue}}
                        format="HH:mm"
                        placeholder="HH:mm"
                        disabled={true}
                    />
                </div>
            </div>
        );
    }
}

export default Example;
