import React from 'react'
import {connect} from 'react-redux'
import {
  AsyncStorage,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import SearchIconAndStatusColor from '../components/SearchIconAndStatusColor'
import ThemeButton from '../components/ThemeButton'
import Button from '../components/Button'
import FieldPicker from '../components/FieldPicker'
import HelpModal from '../components/HelpModal'

import {themes, globalStyles} from '../config/globalStyles'
import updateTheme from '../actions/updateTheme'
import updateSettings from '../actions/updateSettings'
import {importFile, exportFile} from '../lib/importExport'

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
      entryFontSize: props.settings.entryFontSize || 17,
      homePageEntries: props.settings.homePageEntries || 'Oldest first',
      navButtonHelp: false,
      quickBrowseHelp: false,
      entryFontSizeHelp: false,
      homePageEntriesHelp: false,
      importExportHelp: false
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
      this.updateAndSaveSettings()
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

  updateAndSaveSettings = () => {
    this.props.updateSettings(this.state)
    AsyncStorage.setItem('settings', JSON.stringify(this.state))
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

    const helpIcon = (caller, text ) => 
        <>
          <TouchableOpacity onPress={() => this.setState({[caller]: true})}>
            <Icon
            name="md-help-circle"
            color={bodyTextColor}
            size={22}
            style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
          <HelpModal 
            visible={this.state[caller]}
            closeModal={() => this.setState({[caller]: false})}
            bodyTextColor={bodyTextColor}
            helpText={text}
            />
        </>


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
              Next and previous buttons
            </Text>
            {helpIcon('navButtonHelp', 'Display next and previous buttons on each entry to allow browsing by pressing buttons as well as swiping')}
          </View>
          <View style={styles.settingGroup}>
            <View style={{ width: '55%', marginRight: 15 }}>
              <FieldPicker
                type={"font size"}
                options={["12", "13", "14", "15", "16", "17", "18", "19", "20"]}
                selection={entryFontSize.toString()}
                handleChange={entryFontSize => this.setState({entryFontSize})}
                bodyTextColor={bodyTextColor}
                enabled
              />
            </View>
            <Text style={{ color: bodyTextColor, fontSize: 15 }}>
              Font size
            </Text>
            {helpIcon('entryFontSizeHelp', 'Change the font size the main entry content is displayed in')}
          </View>

          <View style={styles.settingGroup}>
            <View style={{width: '55%', marginRight: 15}}>
              <FieldPicker
                type={"Default"}
                options={[
                  "Oldest first",
                  "Newest first",
                  "By Category",
                  "By Author",
                  "By Source",
                ]}
                selection={homePageEntries}
                handleChange={homePageEntries => this.setState({ homePageEntries })}
                bodyTextColor={bodyTextColor}
                enabled
              />
            </View>
            <Text style={{ color: bodyTextColor, fontSize: 15 }}>
              Default 
            </Text>
            {helpIcon('homePageEntriesHelp', 'Change the order in which entries are displayed when you first load the app')}
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
            {helpIcon('quickBrowseHelp', 'Instantly display entries with a particular category, source, author, or tag. When this is off, you can add multiple filters, but will need to click search to display matching entries.')}

          </View>

         {Platform.OS === 'android' &&
          <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
                marginBottom: 15
            }}>
              <Text style={[
                globalStyles.label,
                { color: bodyTextColor},
              ]}>
                Import / Export data
              </Text>
              {helpIcon('importExportHelp', 'Import or export')}
            </View>
            <View style={[
              globalStyles.formItem,
              {
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
                width: "100%",
                marginBottom: 20
              }
            ]}>
              <Button
                buttonText="Import"
                buttonColor={bodyTextColor}
                onPress={() => importFile()}
              />
              <Button
                buttonText="Export"
                buttonColor={buttonPrimary}
                onPress={() => exportFile()}
              />
            </View>
          </>
          }

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
    justifyContent: 'center',
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

export default connect(mapStateToProps, {updateSettings, updateTheme})(Settings)
