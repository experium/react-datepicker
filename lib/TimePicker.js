(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'antd', 'ramda', 'moment', 'react-text-mask', 'classnames'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('antd'), require('ramda'), require('moment'), require('react-text-mask'), require('classnames'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.antd, global.ramda, global.moment, global.reactTextMask, global.classnames);
        global.TimePicker = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _antd, _ramda, _moment, _reactTextMask, _classnames) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _moment2 = _interopRequireDefault(_moment);

    var _reactTextMask2 = _interopRequireDefault(_reactTextMask);

    var _classnames2 = _interopRequireDefault(_classnames);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var getMaxHourRange = function getMaxHourRange(time) {
        var hour = time.hour();
        return (0, _ramda.range)(time.minute() === 0 ? hour : hour + 1, 24);
    };

    var getMinHourRange = function getMinHourRange(time) {
        var hour = time.hour();
        return (0, _ramda.range)(0, time.minute() === 59 ? hour + 1 : hour);
    };

    var getMaxMinuteRange = function getMaxMinuteRange(selectedHour, time) {
        return selectedHour === time.hour() ? (0, _ramda.range)(time.minute(), 60) : [];
    };

    var getMinMinuteRange = function getMinMinuteRange(selectedHour, time) {
        return selectedHour === time.hour() ? (0, _ramda.range)(0, time.minute() + 1) : [];
    };

    var getCorrectValue = function getCorrectValue(value, format) {
        return value ? (0, _moment2.default)(value, format) : null;
    };

    var timeMask = [/[0-2]/, /[0-9]/, ':', /[0-6]/, /[0-9]/];

    var TimePickerComponent = function (_Component) {
        _inherits(TimePickerComponent, _Component);

        function TimePickerComponent() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, TimePickerComponent);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePickerComponent.__proto__ || Object.getPrototypeOf(TimePickerComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
                guide: true
            }, _this.getDisabledHours = function () {
                var _this$props = _this.props,
                    min = _this$props.min,
                    max = _this$props.max,
                    format = _this$props.format;


                var minRange = min ? getMinHourRange((0, _moment2.default)(min, format)) : [];
                var maxRange = max ? getMaxHourRange((0, _moment2.default)(max, format)) : [];

                return (0, _ramda.concat)(minRange, maxRange);
            }, _this.getDisabledMinutes = function (h) {
                var _this$props2 = _this.props,
                    min = _this$props2.min,
                    max = _this$props2.max,
                    format = _this$props2.format;


                var minRange = min ? getMinMinuteRange(h, (0, _moment2.default)(min, format)) : [];
                var maxRange = max ? getMaxMinuteRange(h, (0, _moment2.default)(max, format)) : [];

                return (0, _ramda.concat)(minRange, maxRange);
            }, _this.onChangeTimepicker = function (moment, value) {
                return _this.setValue(value);
            }, _this.clearInput = function () {
                return _this.setValue(null, false);
            }, _this.setValue = function (value) {
                var guide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                _this.props.input.onChange(value);
                _this.setState({ guide: guide });
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(TimePickerComponent, [{
            key: 'getDefaultOpenValue',
            value: function getDefaultOpenValue() {
                var _props = this.props,
                    min = _props.min,
                    max = _props.max,
                    format = _props.format;


                return min ? (0, _moment2.default)(min, format).add(1, 'm') : max ? (0, _moment2.default)(max, format).subtract(1, 'm') : (0, _moment2.default)(0, format);
            }
        }, {
            key: 'render',
            value: function render() {
                var _props2 = this.props,
                    input = _props2.input,
                    mask = _props2.mask,
                    format = _props2.format,
                    placeholder = _props2.placeholder;


                return _react2.default.createElement(
                    'div',
                    { className: 'time-picker' },
                    _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)({ 'time-input-filled': input.value }) },
                        _react2.default.createElement(_reactTextMask2.default, _extends({}, input, {
                            onChange: this.setValue,
                            placeholder: placeholder,
                            mask: mask || timeMask,
                            placeholderChar: '\u2000',
                            className: 'ant-input time-masked-input',
                            guide: this.state.guide
                        })),
                        _react2.default.createElement('span', { className: 'ant-select-selection__clear time-input-clear', onClick: this.clearInput })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'time-options' },
                        _react2.default.createElement(_antd.TimePicker, _extends({}, input, {
                            value: getCorrectValue(input.value, format),
                            format: format,
                            disabledHours: this.getDisabledHours,
                            disabledMinutes: this.getDisabledMinutes,
                            defaultOpenValue: this.getDefaultOpenValue(),
                            onChange: this.onChangeTimepicker
                        }))
                    )
                );
            }
        }]);

        return TimePickerComponent;
    }(_react.Component);

    TimePickerComponent.propTypes = {
        input: _propTypes2.default.object.isRequired,
        min: _propTypes2.default.string,
        max: _propTypes2.default.string,
        placeholder: _propTypes2.default.string,
        format: _propTypes2.default.string.isRequired
    };
    exports.default = TimePickerComponent;
});