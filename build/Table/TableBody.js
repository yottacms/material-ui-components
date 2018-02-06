'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = require('material-ui/Table');

var _materialUi = require('material-ui');

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = (0, _mobxReact.observer)(_class = (_temp2 = _class2 = function (_React$Component) {
    _inherits(_default, _React$Component);

    function _default() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _default);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var rows = this.props.store.rows,
                columns = this.props.columns;


            return _react2.default.createElement(
                _Table.TableBody,
                null,
                rows.map(function (row) {
                    return _react2.default.createElement(
                        _Table.TableRow,
                        {
                            hover: true,
                            key: row.id
                        },
                        columns.map(function (column, index) {
                            return _this2.cellDecorator(column, row, index);
                        })
                    );
                })
            );
        }
    }]);

    return _default;
}(_react2.default.Component), _class2.propTypes = {
    columns: _propTypes2.default.array.isRequired,
    store: _propTypes2.default.object.isRequired
}, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.cellDecorator = function (column, row, index) {

        var innerComponent = null,
            customStyles = {},
            padding = "dense";

        switch (column.type) {

            case 'component':

                var eventsComponent = [];

                Object.keys(column.component.props).map(function (key) {

                    if (key.indexOf('on') === 0) {
                        eventsComponent[key] = function (e) {
                            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                                args[_key2 - 1] = arguments[_key2];
                            }

                            return column.component.props[key](e, row, args);
                        };
                    }
                });

                innerComponent = _react2.default.cloneElement(column.component, eventsComponent);

                break;

            case 'status':
                innerComponent = _react2.default.createElement(_materialUi.Checkbox, {
                    checked: column.checked,
                    onChange: function onChange(e, checked) {
                        return column.callback(row, checked);
                    }
                });
                break;

            case 'switch':
                innerComponent = _react2.default.createElement(_materialUi.Switch, {
                    checked: column.checked,
                    onChange: function onChange(e, checked) {
                        return column.callback(row, checked);
                    }
                });
                break;

            case 'edit':
                innerComponent = _this3.iconDecorator('mode_edit', { row: row, column: column, color: 'primary' });
                break;

            case 'delete':
                innerComponent = _this3.iconDecorator('delete', { row: row, column: column, color: 'secondary' });
                break;

            case 'view':
                innerComponent = _this3.iconDecorator('remove_red_eye', { row: row, column: column, color: 'primary' });
                break;

            default:
                innerComponent = row[column.name];

        }

        if (column.type) {
            customStyles = { width: 50 };
            padding = "none";
        }

        return _react2.default.createElement(
            _Table.TableCell,
            { padding: padding, key: index, style: _extends({}, column.styles, customStyles) },
            _react2.default.createElement(
                'span',
                null,
                innerComponent
            )
        );
    };

    this.iconDecorator = function (icon, _ref2) {
        var color = _ref2.color,
            column = _ref2.column,
            row = _ref2.row;


        return _react2.default.createElement(
            _materialUi.IconButton,
            { color: color, onClick: function onClick() {
                    return column.callback(row);
                } },
            _react2.default.createElement(
                _materialUi.Icon,
                null,
                icon
            )
        );
    };
}, _temp2)) || _class;

exports.default = _default;