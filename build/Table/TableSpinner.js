'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('material-ui/styles');

var _Progress = require('material-ui/Progress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableSpinner = function (_React$Component) {
    _inherits(TableSpinner, _React$Component);

    function TableSpinner() {
        _classCallCheck(this, TableSpinner);

        return _possibleConstructorReturn(this, (TableSpinner.__proto__ || Object.getPrototypeOf(TableSpinner)).apply(this, arguments));
    }

    _createClass(TableSpinner, [{
        key: 'render',
        value: function render() {
            var classes = this.props.classes;


            return _react2.default.createElement(
                'div',
                { className: classes.loadingShading },
                _react2.default.createElement(_Progress.CircularProgress, { className: classes.loadingIcon, color: 'secondary' })
            );
        }
    }]);

    return TableSpinner;
}(_react2.default.Component);

var styles = function styles(theme) {
    return {
        loadingShading: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: theme.zIndex.modal,
            background: theme.palette.background.paper,
            opacity: 0.8
        },

        loadingIcon: {
            position: 'absolute',
            top: 'calc(45% - 10px)',
            left: 'calc(50% - 10px)'
        }
    };
};

exports.default = (0, _styles.withStyles)(styles)(TableSpinner);