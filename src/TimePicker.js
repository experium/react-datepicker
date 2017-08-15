import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import { range, concat } from 'ramda';
import moment from 'moment';
import MaskedInput from 'react-text-mask';
import cx from 'classnames';

const getMaxHourRange = time => {
    const hour = time.hour();
    return range(time.minute() === 0 ? hour : hour + 1, 24);
}

const getMinHourRange = time => {
    const hour = time.hour();
    return range(0, time.minute() === 59 ? hour + 1 : hour);
}

const getMaxMinuteRange = (selectedHour, time) =>
    selectedHour === time.hour() ? range(time.minute(), 60) : [];

const getMinMinuteRange = (selectedHour, time) =>
    selectedHour === time.hour() ? range(0, time.minute() + 1) : [];

const getCorrectValue = (value, format) => value ? moment(value, format) : null;

const timeMask = [/[0-2]/, /[0-9]/, ':', /[0-6]/, /[0-9]/];

export default class TimePickerComponent extends Component {
    static propTypes = {
        input: PropTypes.object.isRequired,
        min: PropTypes.string,
        max: PropTypes.string,
        placeholder: PropTypes.string,
        format: PropTypes.string.isRequired
    };

    state = {
        guide: true
    }

    getDisabledHours = () => {
        const { min, max, format } = this.props;

        const minRange = min ? getMinHourRange(moment(min, format)) : [];
        const maxRange = max ? getMaxHourRange(moment(max, format)) : [];

        return concat(minRange, maxRange);
    }

    getDisabledMinutes = h => {
        const { min, max, format } = this.props;

        const minRange = min ? getMinMinuteRange(h, moment(min, format)) : [];
        const maxRange = max ? getMaxMinuteRange(h, moment(max, format)) : [];

        return concat(minRange, maxRange);
    }

    getDefaultOpenValue() {
        const { min, max, format } = this.props;

        return min ? moment(min, format).add(1, 'm') :
               max ? moment(max, format).subtract(1, 'm') :
               moment(0, format);
    }

    onChangeTimepicker = (moment, value) => this.setValue(value)

    clearInput = () => this.setValue(null, false)

    setValue = (value, guide = true) => {
        this.props.input.onChange(value);
        this.setState({guide});
    }

    render() {
        const { input, mask, format, placeholder } = this.props;

        return (
            <div className="time-picker">
                <div className={cx({'time-input-filled': input.value })}>
                    <MaskedInput
                        {...input}
                        onChange={this.setValue}
                        placeholder={placeholder}
                        mask={mask || timeMask}
                        placeholderChar={'\u2000'}
                        className="ant-input time-masked-input"
                        guide={this.state.guide}
                    />
                    <span className="ant-select-selection__clear time-input-clear" onClick={this.clearInput} />
                </div>
                <div className="time-options">
                    <TimePicker
                        {...input}
                        value={getCorrectValue(input.value, format)}
                        format={format}
                        disabledHours={this.getDisabledHours}
                        disabledMinutes={this.getDisabledMinutes}
                        defaultOpenValue={this.getDefaultOpenValue()}
                        onChange={this.onChangeTimepicker}
                    />
                </div>
            </div>
        )
    }
}
