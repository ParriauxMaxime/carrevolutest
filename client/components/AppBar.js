import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Action, TOGGLE_SESSION_DRAWER, LOAD_SESSIONS } from '../actions/game';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginLeft: 'auto'
    }
});

const title = "Carrevolutest";

const _AppBar = (props) => {
    const { classes } = props;
    return (
        <AppBar position="static" color="primary" className={classes.appBar}>
            <Toolbar>
                <Typography variant="title" color="inherit">
                    {title}
                </Typography>
                <IconButton className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={props.onOpen}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

_AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onOpen: () => {
        dispatch(new Action(TOGGLE_SESSION_DRAWER))
        axios.get('/api/sessions')
        .then(res => {
            dispatch(new Action(LOAD_SESSIONS, res.data))
        }).catch(err => {
            console.warn('Fail to get sessions')
            console.error(err);
        });
    }
})

export default connect(() => ({}), mapDispatchToProps)(withStyles(styles)(_AppBar));

