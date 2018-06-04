import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';
import { Action, PLAY_SOUND, STOP_SOUND } from '../actions/game';

const Player = (props) => {
    return (
        <ReactPlayer url={props.url}
            playing={props.playing}
            onStart={() => props.onStart(props.turn.index)}
            onPlay={() => props.onStart(props.turn.index)}
            onEnded={() => props.onEnded(props.turn.index)}
            onPause={() => props.onEnded(props.turn.index)}            
            controls
            width={"100%"}
            height={"2em"} />
    )
}

const style = theme => ({

})

const mapStateToProps = (state, { index = 0 }) => ({
    playing: (state.turn && state.turn.length > index) ?
        state.turn[index].playingAudio :
        null,
    url: (state.turn && state.turn.length > index) ?
        state.turn[index].audio :
        null,
    turn: (state.turn && state.turn.length > index) ?
        state.turn[index] :
        null
})

const mapDispatchToProps = dispatch => ({
    onEnded: (index) => dispatch(new Action(STOP_SOUND, {index})),
    onStart: (index) => dispatch(new Action(PLAY_SOUND, {index}))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Player))
