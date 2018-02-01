import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableFooter, TablePagination } from 'material-ui/Table';
import { observer } from 'mobx-react';

@observer
export default class extends React.Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    }

    handleChangePage = (event, page) => {
        this.props.store.setCurrentPage(page);
    };
    
    render() {
        
        const { currentPage, pageSize, totalCount } = this.props.store;
        
        return (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={totalCount}
                        rowsPerPage={pageSize}
                        page={currentPage}
                        onChangePage={this.handleChangePage}
                        rowsPerPageOptions={false}
                    />
                </TableRow>
            </TableFooter>
        );
            
    }

}
