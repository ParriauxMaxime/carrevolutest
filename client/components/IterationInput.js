import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import Slider from '@material-ui/lab/Slider';
import InputLabel from '@material-ui/core/InputLabel';

import { iterationChange as iterationChangeAction } from '../actions/iteration'
import withStyles from '@material-ui/core/styles/withStyles';


const maxIteration = 8;

const IterationInput = (props) => {
    return (
        <React.Fragment>
            <InputLabel htmlFor="iteration">
                Nombre d'itérations : {props.value}
            </InputLabel>
            <Slider onChange={(event, value) => props.onChange(value)}
                value={props.value}
                id={"iteration-slider"}
                min={1}
                max={maxIteration}
                step={1}
            />
        </React.Fragment>
    )
}

IterationInput.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    value: state.iteration
})

const mapDispatchToProps = dispatch => ({
    onChange: (val) => dispatch(iterationChangeAction(val))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(IterationInput)
