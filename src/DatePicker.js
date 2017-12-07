import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import MaskedInput from 'react-text-mask';
import cx from 'classnames';
import moment from 'moment';

const getPickerValue = (value, format) => moment(value, format).isValid() ? moment(value, format) : null;

const defaultDateMask = [/[0-3]/, /[0-9]/, '.', /[0-1]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/];
const defaultFormat = 'DD.MM.YYYY';

class DatepickerComponent extends Component {
    static propTypes = {
        input: PropTypes.object.isRequired,
        format: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        inputClassName: PropTypes.string,
        pickerClassName: PropTypes.string
    };

    state = {
        guide: true
    }

    onChangeDatepicker = (moment, value) => this.setValue(value)

    clearInput = () => this.setValue(null, false)

    setValue = (value, guide = true) => {
        this.props.input.onChange(value);
        this.setState({guide});
    }

    render() {
        const { input, placeholder, mask, disabled, inputClassName, pickerClassName } = this.props;
        const format = this.props.format || defaultFormat;

        return (
            <div className="date-picker">
                <div className={cx({'date-input-filled': input.value, 'disabled-input': disabled })}>
                    <div>
                        <MaskedInput
                            {...input}
                            disabled={disabled}
                            onChange={this.setValue}
                            className={cx('ant-input', 'date-masked-input', inputClassName)}
                            mask={mask || defaultDateMask}
                            placeholder={placeholder}
                            placeholderChar={'\u2000'}
                            guide={this.state.guide}
                        />
                        <span className="ant-select-selection__clear date-input-clear" onClick={this.clearInput} />
                    </div>
                    <div ref={node => this.container = node} className="date-calendar">
                        <DatePicker
                            {...input}
                            {...this.props}
                            getCalendarContainer={() => this.container}
                            className={cx(pickerClassName, { 'disabled-picker': disabled })}
                            value={getPickerValue(input.value, format)}
                            onChange={this.onChangeDatepicker}
                            format={format}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default DatepickerComponent;
