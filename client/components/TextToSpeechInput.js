import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import { textInput } from '../actions/text';

const TextToSpeechInput = (props) => {
    const { classes, value, onChange } = props;
    console.log(value);
    return (
        <TextField multiline
            margin="normal"
            className={classes.textToSpeech}
            rows={4}
            rowsMax={6}
            value={value}
            onChange={onChange}
            placeholder={"Text To Speech"} />
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
    value: state.text.input
})

export const mapDispatchToProps = dispatch => ({
    onChange: (event) => dispatch(textInput(event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)
    (withStyles(styles)(TextToSpeechInput))
