(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'antd', 'react-text-mask', 'classnames'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('antd'), require('react-text-mask'), require('classnames'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.antd, global.reactTextMask, global.classnames);
        global.DatePicker = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _antd, _reactTextMask, _classnames) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

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

    var disabledDate = function disabledDate(current) {
        return current && current.valueOf() < Date.now();
    };

    var dateMask = [/[0-3]/, /[0-9]/, '.', /[0-1]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/];

    var DatepickerComponent = function (_Component) {
        _inherits(DatepickerComponent, _Component);

        function DatepickerComponent() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, DatepickerComponent);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatepickerComponent.__proto__ || Object.getPrototypeOf(DatepickerComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
                guide: true
            }, _this.onChangeDatepicker = function (moment, value) {
                return _this.setValue(value);
            }, _this.clearInput = function () {
                return _this.setValue(null, false);
            }, _this.setValue = function (value) {
                var guide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                _this.props.input.onChange(value);
                _this.setState({ guide: guide });
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(DatepickerComponent, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props = this.props,
                    input = _props.input,
                    placeholder = _props.placeholder,
                    format = _props.format,
                    mask = _props.mask;


                return _react2.default.createElement(
                    'div',
                    { className: 'date-picker' },
                    _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)({ 'date-input-filled': input.value }) },
                        _react2.default.createElement(_reactTextMask2.default, _extends({}, input, {
                            onChange: this.setValue,
                            className: 'ant-input date-masked-input',
                            mask: mask || dateMask,
                            placeholder: placeholder,
                            placeholderChar: '\u2000',
                            guide: this.state.guide
                        })),
                        _react2.default.createElement('span', { className: 'ant-select-selection__clear date-input-clear', onClick: this.clearInput })
                    ),
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(node) {
                                return _this2.container = node;
                            }, className: 'date-calendar' },
                        _react2.default.createElement(_antd.DatePicker, _extends({
                            getCalendarContainer: function getCalendarContainer() {
                                return _this2.container;
                            }
                        }, this.props, input, {
                            value: undefined,
                            disabledDate: disabledDate,
                            onChange: this.onChangeDatepicker,
                            format: format
                        }))
                    )
                );
            }
        }]);

        return DatepickerComponent;
    }(_react.Component);

    DatepickerComponent.propTypes = {
        input: _propTypes2.default.object.isRequired,
        format: _propTypes2.default.string.isRequired,
        placeholder: _propTypes2.default.string
    };
    exports.default = DatepickerComponent;
});