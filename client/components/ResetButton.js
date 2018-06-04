import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete'
import withStyles from '@material-ui/core/styles/withStyles';

import { gameStart, Action } from '../actions/game';

const StartButton = (props) => {
  return (
    <Button
      className={props.classes.button}
      variant="raised"
      color="secondary"
      onClick={() => props.dispatch(new Action("RESET"))}>
      Reset
        <DeleteIcon className={props.classes.rightIcon} />
    </Button>
  )
}

const mapStateToProps = state => ({
})

const style = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

export default connect(mapStateToProps)(withStyles(style)(StartButton))
