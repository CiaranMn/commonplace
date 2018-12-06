import React from 'react'
import {connect} from 'react-redux'
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  Form,
  Icon,
  Input,
  Item,
  Label,
} from 'native-base'
import {NavigationEvents} from 'react-navigation'

import {Entry, realm} from '../models/realm'
import updateResults from '../actions/updateResults'

import { globalStyles, borderColor } from '../config/globalStyles';

import DatePickerInput from '../components/DatePicker'
import FieldPicker from '../components/FieldPicker'
import Button from '../components/Button'

class SearchDrawer extends React.Component {

  constructor() {
    super()
    this.initialState = {
      content: '',
      category: null,
      dateFrom: null,
      dateTo: null,
      focus: false,
      author: null,
      source: null,
      tag: null
    }
    this.state = this.initialState
  }

  quickBrowse = (type, value) => {
    // check for focus to avoid quick browse being triggered by new 
    // authors/tags/sources being added with update to entries
    if (this.props.navigation.state.isDrawerOpen) {
      let results = realm.objectForPrimaryKey(type, value).entries
      this.props.updateResults(results, { [type]: value} )
      this.props.updateQuery
      this.props.navigation.navigate('Home')
      this.clearAndClose()
    }
  }

  search = () => {
    const {
      content, 
      category, 
      dateFrom, 
      dateTo, 
      author, 
      source, 
      tag
    } = this.state
    Entry.search({
      content,
      category,
      dateFrom,
      dateTo,
      author,
      source,
      tag
    })
    this.props.navigation.navigate('Home')
    this.clearAndClose()
  }

  clearAndClose = () => {
    Keyboard.dismiss()
    this.props.navigation.closeDrawer()
    this.setState(this.initialState)
  }

  cancel = () => {
    this.clearAndClose()
  }

  render() {

    const {
      deleteColor,
      bodyTextColor,
      buttonPrimary,
      bodyBackgroundColor
    } = this.props.theme

    const { quickBrowse } = this.props.settings

    return (

      <SafeAreaView style={styles.container}>

        <View style={[
          styles.formContainer,
          {
            backgroundColor: bodyBackgroundColor,
            borderColor
          }
        ]}>
          <Form style={styles.form}>
            <Item rounded style={[
              styles.marginBottom,
              {
              borderRadius: 10,
              borderColor,
              backgroundColor: 'white'
              }
            ]} > 
              <Icon name="ios-search" />
              <Input 
                placeholder="Search content" 
                value={this.state.content}
                onChangeText={content => this.setState({content})}
                onSubmitEditing={this.search}
                returnKeyType={'search'}
              />
            </Item>

            <View style={[
              globalStyles.formItem,
              {
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 20
              }
            ]}>
              <Button
                buttonText="Cancel"
                buttonColor={deleteColor}
                onPress={this.cancel}
              />
              <Button
                buttonText="Search"
                buttonColor={buttonPrimary}
                onPress={this.search}
              />
            </View>

            <View style={styles.marginBottom}>
              <Item style={[globalStyles.formItem, globalStyles.alignRight]}>
                <Label style={[globalStyles.label, { color: bodyTextColor }]}>
                  From
                </Label>
                <DatePickerInput
                  date={this.state.dateFrom}
                  changeDate={dateFrom => this.setState({ dateFrom })} />
              </Item>
            </View>
            <View style={styles.marginBottom}>
              <Item style={[globalStyles.formItem, globalStyles.alignRight]}>
                <Label style={[globalStyles.label, { color: bodyTextColor }]}>
                  To
              </Label>
                <DatePickerInput
                  date={this.state.dateTo}
                  changeDate={dateTo => this.setState({ dateTo })} />
              </Item>
            </View>

            <View style={{alignItems: 'center', marginBottom: 10, marginTop: 10}}>
              <Text style={[globalStyles.label, { color: bodyTextColor }]}>
                {quickBrowse ? 'Quick browse' : 'Add filters to your search'}
              </Text>
            </View>

            <View style={styles.marginBottom}>
              <FieldPicker
                enabled
                type="Category"
                options={this.props.categories}
                selection={this.state.category}
                handleChange={category => {
                  this.setState({ category })
                  quickBrowse && this.quickBrowse('Category', category)
                }}
                bodyTextColor={bodyTextColor}
              />
            </View>
            <View style={styles.marginBottom}>
              <FieldPicker
                enabled
                type="Author"
                options={this.props.authors}
                selection={this.state.author}
                handleChange={author => {
                  this.setState({ author })
                  quickBrowse && this.quickBrowse('Author', author)
                }}
                bodyTextColor={bodyTextColor}
              />
            </View>
            <View style={styles.marginBottom}>
              <FieldPicker
                enabled
                type="Source"
                options={this.props.sources}
                selection={this.state.source}
                handleChange={source => {
                  this.setState({ source })
                  quickBrowse && this.quickBrowse('Source', source)
                }}
                bodyTextColor={bodyTextColor}
              />
            </View>
            <View style={styles.marginBottom}>
              <FieldPicker
                enabled
                type="Tag"
                options={this.props.tags}
                selection={this.state.tag}
                handleChange={tag => {
                  this.setState({ tag })
                  quickBrowse && this.quickBrowse('Tag', tag)
                }}
                bodyTextColor={bodyTextColor}
              />
            </View>

          </Form>
        </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  form: {
    width: "90%",
  },
  marginBottom: {
    marginBottom: 15
  }
})

mapStateToProps = ({ authors, categories, sources, tags, settings, theme }) => ({
  authors,
  categories,
  sources,
  tags,
  settings,
  theme
})

export default connect(mapStateToProps, {updateResults})(SearchDrawer)