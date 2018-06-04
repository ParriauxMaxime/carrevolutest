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

class Turn extends Component {
    render() {
        const { index, voice, input, output, loadingAudio, loadingOutput, audio } = this.props;
        const tourNumber = index + 1;
        return (
            <ListItem>
                <ListItemText primary={"Tour " + tourNumber } />
                <ListItemText>                
                    <Typography variant="caption">
                        Input
                    </Typography>                
                    <Typography variant="body1">
                        {input}                    
                    </Typography>
                    <Typography variant="caption">
                        Output {loadingOutput ? " (loading)": null}
                    </Typography>                
                    <Typography variant="body1">
                        {output}                    
                    </Typography>
                    <Typography variant="caption">
                        Audio {loadingAudio ? " (loading)": null}
                    </Typography>
                </ListItemText>                
                <Player index={index || 0} />
            </ListItem>
        )
    }
}

const TurnList = props => {
    return (
        <Paper>
            <List>
            <ListItem>
               <ListItemText primary="Tours"/>
            </ListItem>
                {
                    props.turns.map(turn => (
                            <React.Fragment key={"turn-" + turn.index}>
                                <Divider/>
                                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                                    <Turn {...turn} />
                                </Slide>
                            </React.Fragment>
                        )
                    )
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

    }))(TurnList)
)
