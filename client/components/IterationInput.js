import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Slider from '@material-ui/lab/Slider';

import { formStyle } from './VoiceSelector';
import { Action, ITERATION_CHANGE } from '../actions/game';


const maxIteration = 8;

const IterationInput = (props) => {
    return (
        <FormControl className={props.classes.form}>
            <FormHelperText>
                Nombre de tours : {props.value}
            </FormHelperText>
            <Slider onChange={(event, value) => props.onChange(value)}
                value={props.value}
                id={"iteration-slider"}
                min={1}
                max={maxIteration}
                step={1}
            />
        </FormControl>
    )
}

IterationInput.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    value: state.game.numberOfTurns
})

const mapDispatchToProps = dispatch => ({
    onChange: (val) => dispatch(new Action(ITERATION_CHANGE, val))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(formStyle)(IterationInput))
