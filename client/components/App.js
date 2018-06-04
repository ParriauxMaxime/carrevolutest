import * as React from 'react';
import { connect } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import WithStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';


import AppBar from './AppBar'
import StartButton from './StartButton'
import ResetButton from './ResetButton'
import IterationInput from './IterationInput';
import TextToSpeechInput from './TextToSpeechInput';
import NameInput from './NameInput';
import Player from './Player';
import VoiceSelector from './VoiceSelector';
import Options from './Options';
import SessionDrawer from './SessionDrawer';
import Turn from './Turn';
import SnackBar from './SnackBar';


class App extends React.Component {
  render() {
    const { classes, running } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar />
          <div className={classes.content}>
          <SessionDrawer />
            <div className={classes.body}>
              <Paper className={classes.paper}>
                <Typography variant="display1"
                  align="center"
                  gutterBottom>
                  Le jeu du bouche à oreille
              </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Options</FormLabel>
                  <FormGroup>
                    <NameInput />
                    <VoiceSelector />
                    <IterationInput />
                    <TextToSpeechInput />
                    <Options />
                  </FormGroup>
                </FormControl>
                <StartButton />
                <ResetButton />
                {running ?
                  <LinearProgress variant="query" /> :
                  null
                }
              </Paper>
              <Turn />
            </div>
            <SnackBar />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const style = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'row'
  },
  body: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing.unit + "px 10%",
    },
    margin: theme.spacing.unit,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  paper: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing.unit + "px 10%",
    },
    [theme.breakpoints.up("mdm")]: {
      padding: theme.spacing.unit + "px 30%",
    },
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