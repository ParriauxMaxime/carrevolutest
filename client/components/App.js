import * as React from 'react';
import { connect } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import WithStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import AppBar from './AppBar'
import StartButton from './StartButton'
import ResetButton from './ResetButton'
import IterationInput from './IterationInput';
import TextToSpeechInput from './TextToSpeechInput';
import Player from './Player';
import VoiceSelector from './VoiceSelector';
import Turn from './Turn'
import SnackBar from './SnackBar'


class App extends React.Component {
  render() {
    const { classes, running } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar />
        <div className={classes.body}>
        <Paper className={classes.paper}>
          <Typography variant="display1"
            align="center"
            gutterBottom>
            Le jeu du bouche à oreille
          </Typography>
          <VoiceSelector />
          <IterationInput />
          <TextToSpeechInput />
          <StartButton />
          <ResetButton />
          {running ? 
            <LinearProgress variant="query" />:
            null
          }
        </Paper>
        <Turn />
        </div>
        <SnackBar/>
      </React.Fragment>
    );
  }
}

const style = theme => ({
  body: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing.unit + "px 10%",
    },
    margin: theme.spacing.unit,        
  },
  paper: {
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column"
  }
})


export const mapStateToProps = state => ({
  running: state.game.running
})

export const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(WithStyles(style)(App))