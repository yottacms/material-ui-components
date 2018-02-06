"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mobxStateTree = require("mobx-state-tree");

exports.default = _mobxStateTree.types.model({

    /**
     * Current page of Table
     * @type number
     */
    currentPage: _mobxStateTree.types.number,

    /**
     * Count all rows
     * @type number
     */
    totalCount: _mobxStateTree.types.number,

    /**
     * Count rows per page
     * @type number
     */
    pageSize: _mobxStateTree.types.number,

    /**
     * Current index of sorting column
     * @type string
     */
    sortingColumn: _mobxStateTree.types.optional(_mobxStateTree.types.string, ''),

    /**
     * Direction of sorting (asc, desc)
     * @type string
     */
    sortingBy: _mobxStateTree.types.union(_mobxStateTree.types.literal("asc"), _mobxStateTree.types.literal("desc")),

    /**
     * Loading state
     * @type boolean
     */
    loading: _mobxStateTree.types.optional(_mobxStateTree.types.boolean, true),

    /**
     * Data for current page
     * @type array
     */
    rows: _mobxStateTree.types.frozen,

    /**
     * Hash data of rows
     * @type string
     */
    lastQuery: _mobxStateTree.types.optional(_mobxStateTree.types.frozen)

}).actions(function (self) {
    return {

        /**
         * Set current page
         * @param number page
         */
        setCurrentPage: function setCurrentPage(page) {
            self.currentPage = page;
            self.reloadData();
        },


        /**
         * Set sorting
         * @param string sortingColumn (desc, asc)
         */
        setSorting: function setSorting(sortingColumn) {

            var newOrder = 'desc';

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
        reloadData: function reloadData() {

            var currentPage = self.currentPage,
                pageSize = self.pageSize,
                sortingBy = self.sortingBy,
                sortingColumn = self.sortingColumn,
                dataProvider = (0, _mobxStateTree.getEnv)(self).dataProvider;

            if (JSON.stringify(self.lastQuery) == JSON.stringify([currentPage, pageSize, sortingBy, sortingColumn])) {
                return false;
            }

            self.lastQuery = [currentPage, pageSize, sortingBy, sortingColumn];

            self.loading = true;

            if (Array.isArray(dataProvider)) {
                self._setRows(self._makeLocalSort(dataProvider));
            } else {

                dataProvider(currentPage + 1, pageSize, sortingColumn, sortingBy).then(function (rows) {
                    self._setRows(rows);
                });
            }
        },


        /**
         * Set current data
         * @access private
         * @param array rows
         */
        _setRows: function _setRows(rows) {
            self.rows = rows;
            self.loading = false;
        },


        /**
         * Set current data
         * @access private
         * @param array rows
         * @return array
         */
        _makeLocalSort: function _makeLocalSort(rows) {

            var currentPage = self.currentPage,
                pageSize = self.pageSize,
                sortingBy = self.sortingBy,
                sortingColumn = self.sortingColumn;

            if (sortingColumn) {

                rows = sortingBy === 'desc' ? rows.sort(function (a, b) {
                    return b[sortingColumn] < a[sortingColumn] ? -1 : 1;
                }) : rows.sort(function (a, b) {
                    return a[sortingColumn] < b[sortingColumn] ? -1 : 1;
                });
            }

            rows = rows.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

            return rows;
        }
    };
});