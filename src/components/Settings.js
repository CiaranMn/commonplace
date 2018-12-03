import React from 'react'
import {connect} from 'react-redux'
import {
  AsyncStorage,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native'

import SearchIconAndStatusColor from './SearchIconAndStatusColor'
import ThemeButton from './ThemeButton'
import Button from './Button'
import FieldPicker from './FieldPicker'

import {themes, globalStyles} from '../config/globalStyles'
import updateTheme from '../actions/updateTheme'

class Settings extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerRight: 
    <SearchIconAndStatusColor navigation={navigation} 
      statusBarColor={navigation.getParam('statusBarColor')} />,
    headerStyle: {
      backgroundColor: navigation.getParam('primaryColor'),
    },
    headerTintColor: navigation.getParam('secondaryColor')
  })

  constructor(props) {
    super(props)
    this.updateHeaderTheme()
    this.state = {
      showNavButtons: props.settings.showNavButtons || false,
      quickBrowse: props.settings.quickBrowse || true,
      entryFontSize: props.settings.entryFontSize || 15,
      homePageEntries: props.settings.homePageEntries || 'Oldest first'
    }
  }

  updateHeaderTheme = () => {
    this.props.navigation.setParams({
      primaryColor: this.props.theme.primaryColor,
      secondaryColor: this.props.theme.secondaryColor,
      statusBarColor: this.props.theme.statusBarColor
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.theme !== this.props.theme) {
      this.updateHeaderTheme()
    }
    if (prevState !== this.state) {
      this.props.updateSettings(this.state)
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

  updateAndSaveTheme = theme => {
    this.props.updateTheme(theme)
    AsyncStorage.setItem('theme', JSON.stringify(theme))
      .catch(err => alert(err.message))
  }

  render() {

    const {
      bodyBackgroundColor,
      bodyTextColor,
      primaryColor,
      buttonPrimary
    } = this.props.theme
    const {
      showNavButtons,
      quickBrowse,
      entryFontSize,
      homePageEntries
    } = this.props.settings

    return (
      <View style={{ flex: 1, backgroundColor: bodyBackgroundColor}}>
      <ScrollView contentContainerStyle={styles.home}>
        <View style={{width: "90%", alignItems: 'center'}}>
          <View style={{width: "90%", alignItems: 'flex-start'}}>
            <Text style={[globalStyles.label, {color: bodyTextColor}]}>
              Theme
            </Text>
          </View>
          <View style={styles.themesContainer}>
            {this.renderThemeButtons()}
          </View>

        <View style={{ width: "90%", alignItems: 'flex-start' }}>
          <Text style={[
            globalStyles.label, 
            { color: bodyTextColor, marginTop: 10 }
          ]}>
            Entry view
          </Text>
          
          <View style={styles.settingGroup}>
            <Switch
              value={showNavButtons}
              onValueChange={showNavButtons => this.setState({showNavButtons})}
              style={{
                transform: [{ scaleX: .8 }, { scaleY: .8 }],
                marginRight: 5
              }}
              trackColor={{true: primaryColor}}
            />
            <Text style={{ color: bodyTextColor, fontSize: 15 }}>
              Show next and previous buttons
            </Text>
          </View>
          <View style={styles.settingGroup}>
 
            <Switch
              value={showNavButtons}
              onValueChange={showNavButtons => this.setState({ showNavButtons })}
              style={{
                transform: [{ scaleX: .8 }, { scaleY: .8 }],
                marginRight: 5
              }}
              trackColor={{ true: primaryColor }}
            />
            <Text style={{ color: bodyTextColor, fontSize: 15 }}>
              Font size for entry content
            </Text>
          </View>

          <View style={styles.settingGroup}>
            <View style={{width: '90%', marginRight: 15}}>
              <FieldPicker
                type={"Default"}
                options={[
                  "Oldest first",
                  "Newest first",
                  "By Category",
                  "By Author",
                  "By Source",
                  "Random",
                ]}
                selection={homePageEntries}
                handleChange={homePageEntries => this.setState({ homePageEntries })}
                bodyTextColor={bodyTextColor}
                enabled
              />
            </View>
          </View>

          <Text style={[
            globalStyles.label,
            { color: bodyTextColor, marginTop: 20 }
          ]}>
            Search behaviour
          </Text>
          <View style={styles.settingGroup}>
            <Switch
              value={quickBrowse}
              onValueChange={quickBrowse => this.setState({ quickBrowse })}
              style={{ 
                transform: [{ scaleX: .8 }, { scaleY: .8 }] ,
                marginRight: 5
              }}
              trackColor={{ true: primaryColor }}
            />
            <Text style={{ color: bodyTextColor, fontSize: 15 }}>
              Quick browse entries
            </Text>
          </View>

            <Text style={[
              globalStyles.label,
              { color: bodyTextColor,
                marginTop: 25,
                marginBottom: 20
              },
            ]}>
              Import / Export data
            </Text>
            <View style={[
                globalStyles.formItem,
                {
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: "100%",
                  marginBottom: 15
                }
              ]}>
                <Button
                  buttonText="Import"
                  buttonColor={buttonPrimary}
                  onPress={() => alert('import')}
                />
                <Button
                  buttonText="Export"
                  buttonColor={buttonPrimary}
                  onPress={() => alert('export')}
                />
              </View>
            
          </View>
        </View>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    width: "100%",
    paddingHorizontal: 10
  },
  themesContainer: {
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  settingGroup: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 15,
    width: "100%",
  }
})

mapStateToProps = ({ settings, theme }) => ({
  settings,
  theme
})

const updateSettings = settings =>
  ({
    type: 'UPDATE_SETTINGS',
    settings
  })

export default connect(mapStateToProps, {updateSettings, updateTheme})(Settings)
