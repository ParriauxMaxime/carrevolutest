import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { voiceChange } from '../actions/voice';


const voices = [
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

const VoiceSelector = (props) => {
    return (
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
    )
}

const style = theme => ({

})

export const mapStateToProps = state => ({
    voice: state.voice
})

export const mapDispatchToProps = dispatch => ({
    onChange: (event) => dispatch(voiceChange(event.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(VoiceSelector))
