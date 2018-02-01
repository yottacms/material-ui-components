import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TableBody } from 'material-ui/Table';
import { Checkbox, Switch, IconButton, Icon } from 'material-ui';
import { observer } from 'mobx-react';

@observer
export default class extends React.Component {

    static propTypes = {
        columns: PropTypes.array.isRequired,
        store: PropTypes.object.isRequired
    }
    
    cellDecorator = (column, row, index) => {
        
        var innerComponent = null,
            customStyles = {},
            padding = "dense";
        
        switch (column.type) {
            
            case 'component':
            
                var eventsComponent = [];

                Object.keys(column.component.props).map(function (key) {

                    if (key.indexOf('on') === 0) {
                        eventsComponent[key] = (e, ...args) => column.component.props[key](e, row, args);
                    }

                });

                innerComponent = React.cloneElement(column.component, eventsComponent);
            
                break;

            case 'status':
                    innerComponent =
                        <Checkbox
                            checked={column.checked}
                            onChange={(e, checked) => column.callback(row, checked)}
                        />;
                break;
                
            case 'switch':
                    innerComponent =
                        <Switch
                            checked={column.checked}
                            onChange={(e, checked) => column.callback(row, checked)}
                        />;
                break;

            case 'edit':
                    innerComponent = this.iconDecorator('mode_edit', {row, column, color: 'primary'});
                break;

            case 'delete':
                    innerComponent = this.iconDecorator('delete', {row, column, color: 'secondary'});
                break;

            case 'view':
                    innerComponent = this.iconDecorator('remove_red_eye', {row, column, color: 'primary'});
                break;
                
            default:
                innerComponent = row[column.name];

        }
        
        if (column.type) {
            customStyles = { width: 50 }
            padding = "none"
        }
        
        return (
            <TableCell padding={padding} key={index} style={{...column.styles, ...customStyles}}><span>{innerComponent}</span></TableCell>
        )
    }
    
    iconDecorator = function(icon, { color, column, row }) {

        return (
            <IconButton color={color} onClick={() => column.callback(row)}>
                <Icon>{icon}</Icon>
            </IconButton>
        )
    }
    
    render() {
        
        const { rows } = this.props.store,
            { columns } = this.props;
        
        return (
            <TableBody>
                {rows.map(row => {
                    return (
                        <TableRow
                            hover
                            key={row.id}
                        >
                            {columns.map((column, index) => {
                                return this.cellDecorator(column, row, index);
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        );
            
    }

}
