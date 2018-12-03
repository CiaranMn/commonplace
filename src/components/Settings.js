import React from 'react'
import {connect} from 'react-redux'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native'

import SearchIconAndStatusColor from './SearchIconAndStatusColor'
import ThemeButton from './ThemeButton'
import Button from './Button'

import {themes, globalStyles} from '../config/globalStyles'
import updateTheme from '../actions/updateTheme'

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

  updateAndSaveTheme = theme => {
    this.props.updateTheme(theme)
    AsyncStorage.setItem('theme', JSON.stringify(theme))
      .catch(err => alert(err.message))
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
        <ThemeButton 
          onPress={() => this.updateAndSaveTheme(themes[theme])}
          name={theme}
          key={theme}
          theme={themes[theme]}
          />
      )
    }
    return buttons
  }

  render() {

    const {bodyBackgroundColor, bodyTextColor, primaryColor} = this.props.theme

    return (
      <View style={[styles.home, {backgroundColor: bodyBackgroundColor}]}>
        <View style={{height: "50%"}}>
          <Text style={[
            globalStyles.label,
            {color: bodyTextColor}
            ]}>
            Theme
          </Text>
          <View style={styles.themesContainer}>
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
    width: "100%"
  },
  themesContainer: {
    height: "50%",
    width: "90%",
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})

mapStateToProps = ({ theme }) => ({
  theme
})

export default connect(mapStateToProps, {updateTheme})(Settings)
