import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip'


import { Action, AUTOPLAY_CHANGE, LONDONCALLING_CHANGE, ERASMUS_CHANGE } from '../actions/game';



const Options = (props) => {
    return (
        <React.Fragment>
            <Tooltip title={"Si activé, la synthèse vocale sera joué à chaque tout"}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.autoPlay}
                            onChange={props.autoPlayChange}
                            value="autoplay"
                        />
                    }
                    label="Auto play"
                />
            </Tooltip>
            <Tooltip title={"Les anglais écoutent les américains, et inversement"}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.londonCalling}
                            onChange={props.londonCallingChange}
                            value="londonCalling"
                        />
                    }
                    label="London calling"
                />
            </Tooltip>
            <Tooltip title={"Mixons les nationalités"}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.erasmus}
                            onChange={props.erasmusChange}
                            value="londonCalling"
                        />
                    }
                    label="Erasmus mode"
                />
            </Tooltip>
        </React.Fragment>
    )
}


export const mapStateToProps = state => ({
    autoPlay: state.game.autoPlay,
    londonCalling: state.game.londonCalling,
    erasmus: state.game.erasmus,
})

export const mapDispatchToProps = dispatch => ({
    autoPlayChange: () => dispatch(new Action(AUTOPLAY_CHANGE)),
    londonCallingChange: () => dispatch(new Action(LONDONCALLING_CHANGE)),
    erasmusChange: () => dispatch(new Action(ERASMUS_CHANGE)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Options)
