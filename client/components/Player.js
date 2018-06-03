import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';

const Player = (props) => {
    return (
        <ReactPlayer url={props.url} 
        playing={props.playing} 
        controls
        width={"100%"} 
        height={"2em"}/>
    )
}

const style = theme => ({

})

const mapStateToProps = (state) => ({
    playing: state.game.playing,
    url: (state.sound && state.sound.length > 0) ? state.sound[state.sound.length - 1] : null,
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Player))
