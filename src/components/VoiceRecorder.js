import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import showToast from '../lib/showToast'

import Voice from 'react-native-voice'

export default class VoiceTest extends Component {

  state = { recording: false }

  constructor(props) {
    super(props)
    Voice.onSpeechStart = this.onSpeechStart
    Voice.onSpeechEnd = this.onSpeechEnd
    Voice.onSpeechResults = this.onSpeechResults
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  onSpeechResults = e => {
    this.props.addSpeechResults(e.value[0])
    this.setState({recording: false})
    this._destroyRecognizer()
  }

  _startRecognizing = async () => {
    try {
      await Voice.start('en-UK')
      this.setState({recording: true})
    } catch (e) {
      alert('error starting' + e)
    }
  }

  _stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      alert('error in stopping: ' + e)
    }
  }

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy()
    } catch (e) {
      alert('error in destroying: ' + e)
    }
  }

  toggleVoice = () => {
    if (this.state.recording) {
      this.setState({recording: false},
        this._stopRecognizing
    )} else { 
      Voice.isAvailable()
        .then(resp => {
          this.setState({ recording: true })
          this._startRecognizing()
        })
        .catch(err => 
          showToast("Voice recording not available", "danger")
        )
      }
  }

  render() {

    const {recording} = this.state
    const {offColor, onColor} = this.props

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => this.toggleVoice()}
      >
        <Icon
          ios={recording ? "stop-circle" : "microphone"}
          android={recording ? "stop-circle" : "microphone"}
          type={"FontAwesome"}
          style={{
            color: recording ? onColor : offColor,
            marginLeft: recording ? 5 : 0,
            fontSize: 25
          }} />
      </TouchableOpacity>
    )
  }

}