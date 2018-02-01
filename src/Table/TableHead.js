import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableSortLabel, TableCell, TableRow } from 'material-ui/Table';
import { observer } from 'mobx-react';

@observer
export default class extends React.Component {

    static propTypes = {
        columns: PropTypes.array.isRequired,
        store: PropTypes.object.isRequired
    }
    
    createSortHandler = columnId => event => {
        this.props.store.setSorting(columnId);
    }
    
    cellHeaderDecorator = (column, index) => {
        
        var customStyles = {},
            padding = "dense";
            
        if (column.type) {
            customStyles = { width: 50 }
            padding = "none"
        }
        
        const {sortingColumn, sortingBy} = this.props.store; 

        const inNumeric = ((typeof column.styles != 'undefined' && column.styles.textAlign == 'right') || column.numeric)

        return (
            <TableCell padding={padding} key={index} style={{...column.styles, ...customStyles}} numeric={inNumeric}>
                {!column.type && (
                    <TableSortLabel
                        active={sortingColumn === column.name}
                        direction={sortingBy}
                        onClick={this.createSortHandler(column.name)}
                    >
                        {column.title}
                    </TableSortLabel>
                )}
            </TableCell>
        )
    }
    
    render() {
        
        const { columns } = this.props;
        
        return (
            <TableHead>
                <TableRow>
                    {
                        columns.map((column, index) => {
                            return this.cellHeaderDecorator(column, index);
                        })
                    }
                </TableRow>
            </TableHead>
        );
            
    }

}
