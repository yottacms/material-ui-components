import React from 'react';
import PropTypes from 'prop-types';
import { Table as MuiTable } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { observer } from "mobx-react";
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableSpinner from './TableSpinner';
import TableModel from './Model/TableModel';

@observer
class Table extends React.Component {

    static propTypes = {
        columns: PropTypes.array.isRequired,
        dataProvider: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
        totalCount: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        currentPage: PropTypes.number
    }
    
    static defaultProps = {
        currentPage: 1
    }
    
    store = TableModel.create({
        currentPage: this.props.currentPage - 1,
        pageSize: this.props.pageSize,
        totalCount: this.props.totalCount,
        sortingBy: "asc",
        rows: []
    }, {
        dataProvider: this.props.dataProvider
    })

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        this.store.reloadData();
    }
    
    render() {

        const { classes, columns } = this.props;
        const { loading } = this.store;
        
        return (
            <div className={classes.root}>
                <div className={classes.tableWrapper}>
                    <MuiTable className={classes.table}>
                        <TableHead store={this.store} columns={columns} />
                        <TableBody store={this.store} columns={columns} />
                    </MuiTable>
                </div>
                <MuiTable className={classes.table}>
                    <TableFooter store={this.store} />
                </MuiTable>
                { loading && <TableSpinner /> }
            </div>
        );
    }

}

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
  },
  table: {
    '& td, & th': {
        verticalAlign: 'middle',
        whiteSpace: 'nowrap'
    }
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

export default withStyles(styles)(Table);
