import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import WithStyles from '@material-ui/core/styles/withStyles';

import AppBar from './AppBar'
import StartButton from './StartButton'
import IterationInput from './IterationInput';
import TextToSpeechInput from './TextToSpeechInput';
import Player from './Player';
import VoiceSelector from './VoiceSelector';
import Turn from './Turn'

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar />
        <h1>HelloWorld</h1>
        <Grid container className={classes.body}>
          <Grid item xs={12} sm={3}>
          <VoiceSelector />
          </Grid>
          <Grid item xs={12} sm={3}>
            <IterationInput />
          </Grid>
          <Grid item xs={false} sm={6} />
          <Grid item xs={12}>
            <Turn/>
          </Grid>
          <Grid item xs={4} sm={6}>
          <StartButton/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const style = theme => ({
  body: {
    margin: theme.spacing.unit
  }
})

export default WithStyles(style)(App);