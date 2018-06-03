import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextToSpeechInput from './TextToSpeechInput';
import Player from './Player';

export default class Turn extends Component {
    render() {
        return (
            <Paper>
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <TextToSpeechInput />
                    </Grid>
                    <Grid item xs={4}>
                        <Player />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
