import React from 'react'
import { connect } from 'react-redux'
import {
  Alert,
  Dimensions,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Swiper from 'react-native-swiper'

import { realm, Entry } from '../models/realm'
import updateResults from '../actions/updateResults'

import SearchIconAndStatusColor from './SearchIconAndStatusColor'
import EntryCard from './EntryCard'
import QueryModal from './QueryModal'
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
  }

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

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.updateHeaderTheme()
    }
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
    message += entry.source ? ` (${entry.source.name})` : null
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

    const { bodyTextColor, bodyBackgroundColor, primaryColor, secondaryColor } = this.props.theme

    const renderPagination = (index, total, context) => {
      return <View style={[styles.paginationStyle, { backgroundColor: secondaryColor, borderColor }]}>
        {/* <TouchableOpacity activeOpacity={0.7} onPress={this.toggleModal}> */}
        <Text style={[styles.paginationText, { color: bodyTextColor }]}>
          {index + 1} of {total}
        </Text>
        {/* </TouchableOpacity> */}
      </View>
    }

    return (
      <View style={[styles.home, {backgroundColor: bodyBackgroundColor}]}>
          <Swiper
            ref={"_Swiper"}
            horizontal={true}
            loadMinimal
            loadMinimalSize={2}
            showsPagination={true}
            renderPagination={renderPagination}
            showsButtons={false}
            nextButton={<Text style={[
              styles.navButtons, 
              {color: primaryColor}
            ]}>›</Text>}
            prevButton={<Text style={[
              styles.navButtons,
              { color: primaryColor }
            ]}>‹</Text>}
          >
            {this.props.results.map(entry =>
              <EntryCard
                entry={entry}
                confirmDelete={this.confirmDelete}
                editEntry={this.editEntry}
                shareEntry={this.shareEntry}
                navigation={this.props.navigation}
                key={entry.id}
                theme={this.props.theme}
              />
              )}
          </Swiper>
        <QueryModal
          visible={this.state.modalVisible}
          closeModal={this.toggleModal}
          bodyTextColor={bodyTextColor}
        />
      </View>
    )
  }
  
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  home: {
    flex: 1,
    width: "100%",
    paddingTop: height * 0.02,
    paddingBottom: height * 0.025,
    paddingHorizontal: width * 0.03,
  }, 
  navButtons: {
    fontSize: 50,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -7,
    right: -2,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    opacity: 0.9
  },
  paginationText: {
    fontSize: 15,
  }
})

mapStateToProps = ({ authors, categories, results, sources, tags, query, theme }) => ({
  authors,
  categories,
  results,
  sources,
  query,
  tags,
  theme
})

export default connect(mapStateToProps, {updateResults})(HomePage)