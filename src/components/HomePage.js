import React from 'react'
import { connect } from 'react-redux'
import {
  Alert,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import Swiper from 'react-native-swiper'

import { realm, Entry } from '../models/realm'
import { updateResults } from '../actions/updateResults'
import { globalStyles, primaryColor, bodyTextColor, outlineColor, secondaryColor, bodyBackgroundColor } from '../config/globalStyles'

import SearchIconAndStatusColor from './SearchIconAndStatusColor'
import EntryCard from './EntryCard'
import QueryModal from './QueryModal'

class HomePage extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Commonplace',
    headerRight: <SearchIconAndStatusColor navigation={navigation} />
  })

  state = {
    category: '',
    author: '',
    modalVisible: false,
    selectedIndex: 0
  }

  confirmDelete = () => {
    let entry = this.props.results[this.state.selectedIndex]
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

  setSelected = selectedIndex => {
    this.setState({selectedIndex})
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

  editEntry = () => {
    let entry = this.props.results[this.state.selectedIndex]
    this.props.navigation.navigate('AddOrEditEntry', {entry})
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

  renderPagination = (index, total, context) => {
    return <View style={styles.paginationStyle}>
              {/* <TouchableOpacity activeOpacity={0.7} onPress={this.toggleModal}> */}
              <Text style={styles.paginationText}>
                {index + 1} of {total}
              </Text>
              {/* </TouchableOpacity> */}
            </View>

  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  render() {

    return (
      <View style={[globalStyles.body, styles.home]}>
          <Swiper
            horizontal={true}
            loadMinimal
            loadMinimalSize={2}
            showsPagination={true}
            renderPagination={this.renderPagination}
            showsButtons={false}
            key={this.props.results.length}
            onIndexChanged={this.setSelected}
            // nextButton={<Text style={styles.navButtons}>›</Text>}
            // prevButton={<Text style={styles.navButtons}>‹</Text>}
          >
            {this.props.results.map(entry =>
              <EntryCard
                entry={entry}
                confirmDelete={this.confirmDelete}
                editEntry={this.editEntry}
                navigation={this.props.navigation}
                key={entry.id}
              />
              )}
          </Swiper>
        <QueryModal
          visible={this.state.modalVisible}
          closeModal={this.toggleModal}
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
    paddingBottom: height * 0.03,
    paddingHorizontal: width * 0.03,
    backgroundColor: bodyBackgroundColor
  }, 
  navButtons: {
    fontSize: 50,
    color: primaryColor
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -7,
    right: -2,
    backgroundColor: secondaryColor,
    borderColor: outlineColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    opacity: 0.9
  },
  paginationText: {
    color: bodyTextColor,
    fontSize: 15,
  }
})

mapStateToProps = ({ authors, categories, results, sources, tags, query }) => ({
  authors,
  categories,
  results,
  sources,
  query,
  tags
})

export default connect(mapStateToProps, {updateResults})(HomePage)