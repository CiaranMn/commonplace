import React from 'react'
import { connect } from 'react-redux'
import {
  Alert,
  Dimensions,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Icon } from 'native-base'
import Swiper from 'react-native-swiper'

import { realm, Entry } from '../models/realm'
import updateResults from '../actions/updateResults'

import SearchIconAndStatusColor from '../components/SearchIconAndStatusColor'
import EntryCard from '../components/EntryCard'
import HelpModal from '../components/HelpModal'
import { borderColor } from '../config/globalStyles'

class HomePage extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Commonplace',
    headerRight: 
      <SearchIconAndStatusColor navigation={navigation}
        statusBarColor={navigation.getParam('statusBarColor')} />,
    headerStyle: { 
      backgroundColor: navigation.getParam('primaryColor'),
     },
    headerTintColor: navigation.getParam('secondaryColor')
  })

  state = {
    modalVisible: false,
    index: 0
  }

  constructor(props) {
    super(props)
    this.updateHeaderTheme()
    this.props.updateResults(
      Entry.getEntries(this.props.settings.homePageEntries)
    )
  }

  updateHeaderTheme = () => {
    this.props.navigation.setParams({
      primaryColor: this.props.theme.primaryColor,
      secondaryColor: this.props.theme.secondaryColor,
      statusBarColor: this.props.theme.statusBarColor
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.updateHeaderTheme()
      this.forceRefresh()
    }
    let {homePageEntries} = this.props.settings
    if ((prevProps.settings.homePageEntries !==  homePageEntries) 
         && !this.props.query) {
      this.props.updateResults(
        Entry.getEntries(homePageEntries)
      )
      this.forceRefresh()
    }
  }

  forceRefresh = () => {
    this.setState({index: 0})
  }

  confirmDelete = entry => {
    Alert.alert(
      'Delete entry permanently',
      'Are you sure?',
      [
        {
          text: 'No, cancel',
        },
        {
          text: 'Yes, delete',
          onPress: () => this.deleteEntry(entry),
          style: 'destructive'
        }
      ],
    )
  }

  deleteEntry = (entry)  => {
    this.removeEntryFromCards(entry)
    Entry.deleteEntry(entry)
  }

  removeEntryFromCards = entry => {
    let results = this.props.results.filter(x =>
      x.id !== entry.id)
    this.props.updateResults(results)
  }

  editEntry = entry  => {
    const {primaryColor, secondaryColor, statusBarColor} = this.props.theme
    this.props.navigation.navigate('AddOrEditEntry', {
      entry,
      primaryColor,
      secondaryColor,
      statusBarColor
    })
  }

  shareEntry = entry => {
    let message = `"${entry.content}" - ${entry.author.name}`
    message += entry.source ? ` (${entry.source.name})` : ''
    Share.share({
      message,
      title: "Check out this quote"
    }, {
      subject: "Check out this quote",
      dialogTitle: "Share entry"
    })
  }

  browseEntries = ({author, category}) => {
    let results
    if (author) {
      this.setState({
        author,
        category: null
      })
      results = realm.objectForPrimaryKey('Author', author).entries
    } else if (category) {
      this.setState({
        category,
        author: null
      })
      results = realm.objectForPrimaryKey('Category', category).entries
    } else { 
      return
    }
    results = Array.prototype.slice.call(results)
    this.props.updateResults(results)
  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  render() {

    const { bodyTextColor, secondaryColor } = this.props.theme
    const {query} = this.props

    let { showNavButtons, entryFontSize } = this.props.settings
    
    entryFontSize = parseInt(entryFontSize)

    const renderPagination = (index, total, context) => {
      return <View style={[styles.paginationStyle, { backgroundColor: secondaryColor, borderColor }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={this.toggleModal}>
          <Text style={[styles.paginationText, { color: bodyTextColor }]}>
            {index + 1} of {total}
          </Text>
          <HelpModal
            visible={this.state.modalVisible}
            closeModal={this.toggleModal}
            bodyTextColor={bodyTextColor}
            query={query}
          />
        </TouchableOpacity>
      </View>
    }

    return (
      <Swiper
        ref={"_Swiper"}
        horizontal={true}
        loadMinimal
        loadMinimalSize={1}
        showsPagination={true}
        renderPagination={renderPagination}
        showsButtons={showNavButtons}
        nextButton={
          <Icon
            ios={"arrow-right"}
            android={"arrow-right"}
            type={"FontAwesome"}
            style={{
              color: bodyTextColor,
              fontSize: 26,
              marginRight: 12
            }} />
        }
        prevButton={
            <Icon
              ios={"arrow-left"}
              android={"arrow-left"}
              type={"FontAwesome"}
              style={{
              color: bodyTextColor,
              fontSize: 26,
              marginLeft: 12
              }} />
        }
      >
        {this.props.results.map(entry =>
          <EntryCard
            entry={entry}
            confirmDelete={this.confirmDelete}
            editEntry={this.editEntry}
            shareEntry={this.shareEntry}
            navigation={this.props.navigation}
            key={entry.id}
          />
          )}
      </Swiper>
    )
  }
  
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  navButtons: {
    fontSize: 60,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: height * 0.02,
    right: width * 0.03,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    opacity: 0.9
  },
  paginationText: {
    fontSize: 15,
  }
})

mapStateToProps = ({ authors, categories, results, sources, tags, query, settings, theme }) => ({
  authors,
  categories,
  results,
  sources,
  query,
  tags,
  settings,
  theme
})

export default connect(mapStateToProps, {updateResults})(HomePage)