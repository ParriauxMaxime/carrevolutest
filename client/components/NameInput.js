import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip'


import { Action, TEXT_CHANGE, NAME_CHANGE } from '../actions/game';

const TextToSpeechInput = (props) => {
    const { classes, value, onChange } = props;
    return (
        <FormControl className={props.classes.form}>
            <FormHelperText>
                Nom
            </FormHelperText>
            <Tooltip title="Nom de la sauvegarde.">
            <TextField 
                margin="normal"
                className={classes.textfield}
                value={value}
                onChange={onChange}/>
            </Tooltip>
        </FormControl>
    )
}

const styles = theme => ({
    textfield: {
        padding: theme.spacing.unit,
        width: "100%",
        height: "100%"
    }
})


export const mapStateToProps = state => ({
    value: state.session.name
})

export const mapDispatchToProps = dispatch => ({
    onChange: (event) => dispatch(new Action(NAME_CHANGE, event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)
    (withStyles(styles)(TextToSpeechInput))
