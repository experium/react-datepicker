import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import MaskedInput from 'react-text-mask';
import cx from 'classnames';

const disabledDate = (current) => current && current.valueOf() < Date.now();

class DatepickerComponent extends Component {
    static propTypes = {
        input: PropTypes.object.isRequired,
        format: PropTypes.string.isRequired,
        mask: PropTypes.array.isRequired,
        placeholder: PropTypes.string
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
        const { input, placeholder, format, mask } = this.props;

        return (
            <div className="date-picker">
                <div className={cx({'date-input-filled': input.value })}>
                    <MaskedInput
                        {...input}
                        onChange={this.setValue}
                        className="ant-input date-masked-input"
                        mask={mask}
                        placeholder={placeholder}
                        placeholderChar={'\u2000'}
                        guide={this.state.guide}
                    />
                    <span className="ant-select-selection__clear date-input-clear" onClick={this.clearInput} />
                </div>
                <div ref={node => this.container = node} className="date-calendar">
                    <DatePicker
                        getCalendarContainer={() => this.container}
                        {...this.props}
                        {...input}
                        value={undefined}
                        disabledDate={disabledDate}
                        onChange={this.onChangeDatepicker}
                        format={format}
                    />
                </div>
            </div>
        )
    }
}

export default DatepickerComponent;
