import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import withStyles from '@material-ui/core/styles/withStyles';

import { gameStart } from '../actions/game';

const StartButton = (props) => {
  return (
      <IconButton onClick={props.initGame} >
        <PlayArrowIcon />
      </IconButton>
  ) 
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  initGame: () => dispatch(gameStart())
})

const style = theme => ({
  button: {
    height: 50,
    width: 50,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(StartButton))
