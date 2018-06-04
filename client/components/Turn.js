import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';


import TextToSpeechInput from './TextToSpeechInput';
import Player from './Player';
import { getFormattedVoiceName } from './VoiceSelector';

class Turn extends Component {
    render() {
        const { index, voice, model, input, output, loadingAudio, loadingOutput, audio, classes } = this.props;
        const tourNumber = index + 1;
        return (
            <ListItem>
                <ListItemText primary={"Tour " + tourNumber}
                    className={classes.listTitle} />
                <div className={classes.listContent}>
                    <Typography variant="caption">
                        Input
                    </Typography>
                    <Typography paragraph variant="body1">
                        {input}
                    </Typography>
                    <Typography variant="caption">
                        Voix de synthese
                    </Typography>
                    <Typography paragraph variant="body1">
                        {getFormattedVoiceName(voice)}
                    </Typography>
                    <Typography variant="caption">
                        Audio {loadingAudio ? " (loading)" : null}
                    </Typography>
                    <Player index={index || 0} />
                    <Typography paragraph />
                    <Typography variant="caption">
                        Modèle de reconaissance
                    </Typography>
                    <Typography paragraph variant="body1">
                        {model}
                    </Typography>
                    <Typography variant="caption">
                        Output {loadingOutput ? " (loading)" : null}
                    </Typography>
                    <Typography variant="body1">
                        {output}
                    </Typography>
                </div>
            </ListItem>
        )
    }
}

const TurnList = props => {
    return (
        <Paper className={props.classes.paper}>
            <List>
                <ListItem>
                    <ListItemText primary="Tours" />
                </ListItem>
                {
                    props.turns.map(turn => (
                        <React.Fragment key={"turn-" + turn.index}>
                            <Divider />
                            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                                <Turn {...turn} classes={props.classes} />
                            </Slide>
                        </React.Fragment>
                    ))
                }
            </List>
        </Paper>
    )
}


export const mapStateToProps = state => ({
    turns: state.turn
})

export const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(theme => ({
        listTitle: {
            flexGrow: 0,
        },
        listContent: {
            flexGrow: 1,
        },
        paper: {
            margin: theme.spacing.unit + "px 0"
        }
    }))(TurnList)
)
