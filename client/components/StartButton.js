import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop';
import withStyles from '@material-ui/core/styles/withStyles';

import { gameStart, Action, GAME_END } from '../actions/game';

const StartButton = (props) => {
  return (
    <Button
      className={props.classes.button}
      variant="raised"
      color="primary"
      disabled={!props.running && !!props.turn.length}
      onClick={() => {
        if (!props.running)
          props.initGame()
        else 
          props.stopGame()
      }}>
      {!props.running ? "Start" : "Stop"}
      {
        !props.running ?
          <PlayArrowIcon className={props.classes.rightIcon} /> :
          <StopIcon className={props.classes.rightIcon} />
      }
    </Button>
  )
}

const mapStateToProps = state => ({
  running: state.game.running,
  turn: state.turn
})

const mapDispatchToProps = dispatch => ({
  initGame: () => gameStart(),
  stopGame: () => dispatch(new Action(GAME_END))
})

const style = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(StartButton))
