import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { TOGGLE_SESSION_DRAWER, Action, SESSION_LOAD } from '../actions/game';

const drawerWidth = 240;

const styles = theme => ({
    paper: {
        minWidth: drawerWidth,
        width: 'auto'
    },
    toolbar: theme.mixins.toolbar,
    selected: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
});

const Session = (props) => {
    const dateFormat = date => {
        return moment(date).format('DD/MM/YY - HH:mm') 
    }
    return (
        <React.Fragment>
        <ListItem button 
        onClick={() => props.loadSession(props)}
        className={props.id === props.active ? props.classes.selected : ""}>
            <ListItemText primary={props.name || props.id} 
            secondary={dateFormat(props.timeStamp)}/>
        </ListItem>
        </React.Fragment>
    )
}

const SessionDrawer = (props) => {
    const { classes, open, sessions } = props;
    return (
        <Drawer
            classes={{
                paper: classes.paper
            }}
            variant={"temporary"}
            open={open}
            elevation={24}
            onClose={props.onClose}
            anchor={'right'}>
            <List >
            <ListItem className={classes.toolbar}>
                <ListItemText primary="Charger une session" />
            </ListItem>
            <Divider />
            {
                sessions.map(e => {
                    return <Session {...e}
                    classes={classes}
                    active={props.active}
                    key={e.id}
                    loadSession={props.loadSession}/>
                })
            }
            </List>
        </Drawer>
    );
}


export const mapStateToProps = state => ({
    open: state.game.sessionDrawer,
    sessions: state.session.sessions,
    active: state.session.active
})

export const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(new Action(TOGGLE_SESSION_DRAWER))
    },
    loadSession: (session) => {
        dispatch(new Action(SESSION_LOAD, session))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SessionDrawer));
