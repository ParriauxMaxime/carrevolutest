import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux'
import { Action, CLOSE_ERROR } from '../actions/game';


const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

const SimpleSnackbar = (props) => {
    const { classes } = props;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={props.error.open}
            autoHideDuration={3000}
            onClose={() => props.dispatch(new Action(CLOSE_ERROR))}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{props.error.reason}</span>}
        />
    );
}

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};


export const mapStateToProps = state => {
    return {
        error: state.game.error
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleSnackbar));