(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './DatePicker', './TimePicker'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./DatePicker'), require('./TimePicker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.DatePicker, global.TimePicker);
    global.exports = mod.exports;
  }
})(this, function (exports, _DatePicker, _TimePicker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TimePicker = exports.DatePicker = undefined;

  var _DatePicker2 = _interopRequireDefault(_DatePicker);

  var _TimePicker2 = _interopRequireDefault(_TimePicker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DatePicker = exports.DatePicker = _DatePicker2.default;
  var TimePicker = exports.TimePicker = _TimePicker2.default;
});