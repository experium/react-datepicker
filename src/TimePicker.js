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

const getCorrectValue = (value, format) => moment(value, format).isValid() ? moment(value, format) : null;

const defaultTimeMask = [/[0-2]/, /[0-9]/, ':', /[0-6]/, /[0-9]/];
const defaultFormat = 'HH:mm';

export default class TimePickerComponent extends Component {
    static propTypes = {
        input: PropTypes.object.isRequired,
        min: PropTypes.string,
        max: PropTypes.string,
        placeholder: PropTypes.string,
        format: PropTypes.string,
        disabled: PropTypes.bool,
        inputClassName: PropTypes.string,
        pickerClassName: PropTypes.string,
        allowClear: PropTypes.bool
    };

    state = {
        guide: true
    }

    getDisabledHours = () => {
        const { min, max } = this.props;

        const minRange = min ? getMinHourRange(moment(min, this.format)) : [];
        const maxRange = max ? getMaxHourRange(moment(max, this.format)) : [];

        return concat(minRange, maxRange);
    }

    getDisabledMinutes = h => {
        const { min, max } = this.props;

        const minRange = min ? getMinMinuteRange(h, moment(min, this.format)) : [];
        const maxRange = max ? getMaxMinuteRange(h, moment(max, this.format)) : [];

        return concat(minRange, maxRange);
    }

    getDefaultOpenValue() {
        const { min, max } = this.props;

        return min ? moment(min, this.format).add(1, 'm') :
               max ? moment(max, this.format).subtract(1, 'm') :
               moment(0, this.format);
    }

    onChangeTimepicker = (moment, value) => this.setValue(value)

    clearInput = () => this.setValue(null, false)

    setValue = (value, guide = true) => {
        this.props.input.onChange(value);
        this.setState({guide});
    }

    render() {
        const { input, mask, placeholder, disabled, inputClassName, pickerClassName, allowClear } = this.props;
        this.format = this.props.format || defaultFormat;

        return (
            <div className="time-picker">
                <div className={cx({'time-input-filled': input.value, 'disabled-input': disabled })}>
                    <div>
                        <MaskedInput
                            {...input}
                            disabled={disabled}
                            onChange={this.setValue}
                            placeholder={placeholder}
                            mask={mask || defaultTimeMask}
                            placeholderChar={'\u2000'}
                            className={cx('ant-input', 'time-masked-input', inputClassName)}
                            guide={this.state.guide}
                        />
                        { allowClear && <span className="ant-select-selection__clear time-input-clear" onClick={this.clearInput} /> }
                    </div>
                    <div className="time-options">
                        <TimePicker
                            {...input}
                            {...this.props}
                            className={cx(pickerClassName, { 'disabled-picker': disabled })}
                            value={getCorrectValue(input.value, this.format)}
                            format={this.format}
                            disabledHours={this.getDisabledHours}
                            disabledMinutes={this.getDisabledMinutes}
                            defaultOpenValue={this.getDefaultOpenValue()}
                            onChange={this.onChangeTimepicker}
                            popupClassName='time-picker-popup'
                        />
                    </div>
                </div>
            </div>
        )
    }
}
