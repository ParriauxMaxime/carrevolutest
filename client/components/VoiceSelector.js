import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip'

import { Action, VOICE_CHANGE } from '../actions/game';

export const voices = [
    "en-US_AllisonVoice",
    "en-US_LisaVoice",
    "en-US_MichaelVoice",
    "en-GB_KateVoice",
    "es-ES_EnriqueVoice",
    "es-ES_LauraVoice",
    "es-LA_SofiaVoice",
    "es-US_SofiaVoice",
    "de-DE_DieterVoice",
    "de-DE_BirgitVoice",
    "fr-FR_ReneeVoice",
    "it-IT_FrancescaVoice",
    "ja-JP_EmiVoice",
    "pt-BR_IsabelaVoice"
]

export const getLanguageVoice = (voice) => {
    return voice.slice(0, 5);
}

export const getFormattedVoiceName = (voice) => {
    return `${getLanguageVoice(voice)} ${voice.slice(6, -5)}s` 
}

const VoiceSelector = (props) => {
    return (
        <FormControl className={props.classes.form}>
            <FormHelperText>Voice</FormHelperText>
            <Tooltip title="Selectionner une voix pour la synthèse vocale (text to speech)">
                <Select
                    value={props.voice}
                    onChange={props.onChange}
                    name="voice">
                    {
                        voices.map(voice => {
                            return (
                                <MenuItem key={voice} value={voice}>
                                    {
                                        voice.slice(0, 5) + ' ' + voice.slice(6, -5)
                                    }
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </Tooltip>
        </FormControl>
    )
}

export const formStyle = theme => ({
    form: {
        minWidth: 200,
        height: "auto",
    }
})

export const mapStateToProps = state => ({
    voice: state.game.voice
})

export const mapDispatchToProps = dispatch => ({
    onChange: (event) => dispatch(new Action(VOICE_CHANGE, event.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyle)(VoiceSelector))
