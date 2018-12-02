import React from 'react'
import {connect} from 'react-redux'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

import SearchIconAndStatusColor from './SearchIconAndStatusColor'

class Settings extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerRight: <SearchIconAndStatusColor navigation={navigation} />
  })

  state = {
    image: '',
    text: 'Test text'
  }

  render() {

    const {bodyBackgroundColor, primaryColor} = this.props.theme

    return (
      <View style={[styles.home, {backgroundColor: bodyBackgroundColor}]}>
        <Text>This is the Settings Page</Text>
        <Image source={{uri: `${this.state.source}`}} style={{width:300, height: 300}}/>
        <Text>{this.state.text}</Text>
        <Button buttonText={"Test OCR"}
          onPress={() => alert('moved')}
          buttonColor={primaryColor}
          >
            Pick image
          </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

mapStateToProps = ({ theme }) => ({
  theme
})

export default connect(mapStateToProps)(Settings)
