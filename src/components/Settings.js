import React from 'react'
import {connect} from 'react-redux'
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

import {NavigationActions} from 'react-navigation'

import SearchIconAndStatusColor from './SearchIconAndStatusColor'
import Button from './Button'

import {themes, globalStyles} from '../config/globalStyles'

class Settings extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerRight: 
    <SearchIconAndStatusColor navigation={navigation} 
      statusBarColor={navigation.getParam('statusBarColor', '#3C8C90')} />,
    headerStyle: {
      backgroundColor: navigation.getParam('primaryColor', '#3C8C90'),
    },
    headerTintColor: navigation.getParam('secondaryColor', '#fff')
  })

  constructor(props) {
    super(props)
    this.updateHeaderTheme()
  }

  updateHeaderTheme = () => {
    this.props.navigation.setParams({
      primaryColor: this.props.theme.primaryColor,
      secondaryColor: this.props.theme.secondaryColor,
      statusBarColor: this.props.theme.statusBarColor
    })
  }

  changeTheme = theme => {
    this.props.changeTheme(theme)
    // try {
    //   await AsyncStorage.setItem('theme', JSON.stringify(theme))
    // } catch (err) {
    //   alert(err.message)
    // }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.updateHeaderTheme()
    }
  }

  renderThemeButtons = () => {
    let buttons = []
    for (let theme in themes) {
      buttons.push(
        <Button 
          onPress={() => this.changeTheme(themes[theme])}
          buttonColor={themes[theme].primaryColor}
          buttonText={theme}
          key={theme}
          />
      )
    }
    return buttons
  }

  render() {

    const {bodyBackgroundColor, bodyTextColor, primaryColor} = this.props.theme

    return (
      <View style={[styles.home, {backgroundColor: bodyBackgroundColor}]}>
        <View>
          <Text style={[
            globalStyles.label,
            {color: bodyTextColor}
            ]}>
            Theme
          </Text>
          <View>
            {this.renderThemeButtons()}
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  }
})

mapStateToProps = ({ theme }) => ({
  theme
})

mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch({ type: 'CHANGE_THEME', theme })
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
