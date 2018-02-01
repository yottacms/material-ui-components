import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

class TableSpinner extends React.Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.loadingShading}>
                <CircularProgress className={classes.loadingIcon} color="secondary" />
            </div>
        )
    }
}

const styles = theme => ({
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
        left: 'calc(50% - 10px)',
    }
});

export default withStyles(styles)(TableSpinner);
