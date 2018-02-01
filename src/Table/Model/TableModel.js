import { types, getEnv } from "mobx-state-tree"

export default types.model({
    
    /**
     * Current page of Table
     * @type number
     */
    currentPage: types.number,
    
    /**
     * Count all rows
     * @type number
     */
    totalCount: types.number,
    
    /**
     * Count rows per page
     * @type number
     */
    pageSize: types.number,
    
    /**
     * Current index of sorting column
     * @type string
     */
    sortingColumn: types.optional(types.string, ''),
    
    /**
     * Direction of sorting (asc, desc)
     * @type string
     */
    sortingBy: types.union(types.literal("asc"), types.literal("desc")),
    
    /**
     * Loading state
     * @type boolean
     */
    loading: types.optional(types.boolean, true),

    /**
     * Data for current page
     * @type array
     */
    rows: types.frozen,
    
    /**
     * Hash data of rows
     * @type string
     */
    lastQuery: types.optional(types.frozen),
    
})
.actions(self => ({
    
    /**
     * Set current page
     * @param number page
     */
    setCurrentPage(page) {
        self.currentPage = page;
        self.reloadData();
    },

    /**
     * Set sorting
     * @param string sortingColumn (desc, asc)
     */
    setSorting(sortingColumn) {
        
        let newOrder = 'desc';

        if (self.sortingColumn === sortingColumn && self.sortingBy === 'desc') {
            newOrder = 'asc';
        }
        
        self.sortingColumn = sortingColumn;
        self.sortingBy = newOrder;
        
        self.reloadData();

    },

    /**
     * Reload rows with current state
     */
    reloadData() {

        var currentPage = self.currentPage,
            pageSize =  self.pageSize,
            sortingBy = self.sortingBy,
            sortingColumn = self.sortingColumn,
            dataProvider = getEnv(self).dataProvider;
            
        if (JSON.stringify(self.lastQuery) == JSON.stringify([currentPage, pageSize, sortingBy, sortingColumn])) {
            return false;
        }

        self.lastQuery = [currentPage, pageSize, sortingBy, sortingColumn];

        self.loading = true;
                
        if (Array.isArray(dataProvider)) {
            self._setRows(self._makeLocalSort(dataProvider));
        }
        else {
            
            dataProvider(currentPage + 1, pageSize, sortingColumn, sortingBy)
                .then((rows) => {
                    self._setRows(rows);
                })

        }

    },
    
    /**
     * Set current data
     * @access private
     * @param array rows
     */
    _setRows(rows) {
        self.rows = rows;
        self.loading = false;
    },
    
    /**
     * Set current data
     * @access private
     * @param array rows
     * @return array
     */
    _makeLocalSort(rows) {
        
        var currentPage = self.currentPage,
            pageSize =  self.pageSize,
            sortingBy = self.sortingBy,
            sortingColumn = self.sortingColumn;
            
        if (sortingColumn) {
            
            rows = (sortingBy === 'desc')
                ? rows.sort((a, b) => (b[sortingColumn] < a[sortingColumn] ? -1 : 1))
                : rows.sort((a, b) => (a[sortingColumn] < b[sortingColumn] ? -1 : 1));
            
        }
        
        rows = rows.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
        
        return rows;
        
    }

}));
