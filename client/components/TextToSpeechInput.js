import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip'


import { Action, TEXT_CHANGE } from '../actions/game';

const TextToSpeechInput = (props) => {
    const { classes, value, onChange } = props;
    return (
        <FormControl className={props.classes.form}>
            <FormHelperText>
                Texte
            </FormHelperText>
            <Tooltip title="Ajouter le texte initial.">
            <TextField multiline
                margin="normal"
                className={classes.textToSpeech}
                rows={4}
                rowsMax={6}
                value={value}
                onChange={onChange}
                placeholder={"Text To Speech"} />
            </Tooltip>
        </FormControl>
    )
}

const styles = theme => ({
    textToSpeech: {
        padding: theme.spacing.unit,
        width: "100%",
        height: "100%"
    }
})


export const mapStateToProps = state => ({
    value: state.game.input
})

export const mapDispatchToProps = dispatch => ({
    onChange: (event) => dispatch(new Action(TEXT_CHANGE, event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)
    (withStyles(styles)(TextToSpeechInput))
