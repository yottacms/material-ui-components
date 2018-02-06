'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUi = require('material-ui');

var _styles = require('material-ui/styles');

var _mobxReact = require('mobx-react');

var _TableHead = require('./TableHead');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableFooter = require('./TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _TableSpinner = require('./TableSpinner');

var _TableSpinner2 = _interopRequireDefault(_TableSpinner);

var _TableModel = require('./Model/TableModel');

var _TableModel2 = _interopRequireDefault(_TableModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = (0, _mobxReact.observer)(_class = (_temp2 = _class2 = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Table);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Table.__proto__ || Object.getPrototypeOf(Table)).call.apply(_ref, [this].concat(args))), _this), _this.store = _TableModel2.default.create({
            currentPage: _this.props.currentPage - 1,
            pageSize: _this.props.pageSize,
            totalCount: _this.props.totalCount,
            sortingBy: "asc",
            rows: []
        }, {
            dataProvider: _this.props.dataProvider
        }), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Table, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.componentDidUpdate();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.store.reloadData();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                columns = _props.columns;
            var loading = this.store.loading;


            return _react2.default.createElement(
                'div',
                { className: classes.root },
                _react2.default.createElement(
                    'div',
                    { className: classes.tableWrapper },
                    _react2.default.createElement(
                        _materialUi.Table,
                        { className: classes.table },
                        _react2.default.createElement(_TableHead2.default, { store: this.store, columns: columns }),
                        _react2.default.createElement(_TableBody2.default, { store: this.store, columns: columns })
                    )
                ),
                _react2.default.createElement(
                    _materialUi.Table,
                    { className: classes.table },
                    _react2.default.createElement(_TableFooter2.default, { store: this.store })
                ),
                loading && _react2.default.createElement(_TableSpinner2.default, null)
            );
        }
    }]);

    return Table;
}(_react2.default.Component), _class2.propTypes = {
    columns: _propTypes2.default.array.isRequired,
    dataProvider: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.func]).isRequired,
    totalCount: _propTypes2.default.number.isRequired,
    pageSize: _propTypes2.default.number.isRequired,
    currentPage: _propTypes2.default.number
}, _class2.defaultProps = {
    currentPage: 1
}, _temp2)) || _class;

var styles = function styles(theme) {
    return {
        root: {
            width: '100%',
            position: 'relative'
        },
        table: {
            '& td, & th': {
                verticalAlign: 'middle',
                whiteSpace: 'nowrap'
            }
        },
        tableWrapper: {
            overflowX: 'auto'
        }
    };
};

exports.default = (0, _styles.withStyles)(styles)(Table);