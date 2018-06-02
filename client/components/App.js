import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import AppBar from './AppBar'
import StartButton from './StartButton'
import IterationInput from './IterationInput';
import TextToSpeechInput from './TextToSpeechInput';
import WithStyles from '@material-ui/core/styles/withStyles';

class App extends React.Component {
  render() {
    const {classes} = this.props;
    return (
        <React.Fragment>
          <CssBaseline/>
          <AppBar />
          <h1>HelloWorld</h1>
          <Grid container className={classes.body}>
            <Grid item xs={4}>
              <IterationInput/>
            </Grid>
            <Grid item xs={2}>
            <StartButton />
            </Grid>            
            <Grid item xs={2}/>
            <Grid item xs={12} sm={6}>
              <TextToSpeechInput />
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