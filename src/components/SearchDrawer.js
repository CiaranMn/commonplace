import React from 'react'
import {connect} from 'react-redux'
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import {
  Form,
  Icon,
  Input,
  Item,
  Label,
} from 'native-base'

import moment from 'moment'
import {Entry} from '../models/realm'
import {updateResults} from '../actions/updateResults'

import { 
  globalStyles,
  secondaryColor, 
  deleteColor,
  bodyTextColor, 
  outlineColor, 
  primaryColor,
  bodyBackgroundColor
} from '../config/globalStyles';

import { headerHeight } from '../navigators/StackNavigators'
import DatePickerInput from './DatePicker'
import FieldPicker from './FieldPicker'
import Button from './Button'

class SearchDrawer extends React.Component {

  constructor() {
    super()
    this.initialState = {
      content: '',
      category: null,
      dateFrom: null,
      dateTo: null,
      author: null,
      source: null,
      tag: null
    }
    this.state = this.initialState
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

    return (

      <SafeAreaView 
        style={styles.container}
        name="_safeAreaView"
        >

        <View style={styles.formContainer}>
          <Form style={styles.form}>
            <Item rounded style={[
              styles.marginBottom,
              {
              borderRadius: 10,
              borderColor: outlineColor
              }
            ]} > 
              <Icon name="ios-search" />
              <Input 
                placeholder="Search entry content" 
                value={this.state.content}
                onChangeText={content => this.setState({content})}
                onSubmitEditing={this.search}
                returnKeyType={'search'}
              />
            </Item>

            <View style={[
              globalStyles.formItem,
              styles.marginBottom,
              {
                justifyContent: 'space-between',
                flexDirection: 'row',
              }
            ]}>
              <Button
                buttonText="Cancel"
                buttonColor={deleteColor}
                onPress={this.cancel}
              />
              <Button
                buttonText="Search"
                buttonColor={primaryColor}
                onPress={this.search}
              />
            </View>


            <View style={styles.marginBottom}>
              <FieldPicker
                enabled
                type="Category"
                options={this.props.categories}
                selection={this.state.category}
                handleChange={category => this.setState({ category })}
              />
            </View>
            <View style={styles.marginBottom}>
              <FieldPicker
                enabled
                type="Author"
                options={this.props.authors}
                selection={this.state.author}
                handleChange={author => this.setState({ author })}
              />
            </View>
            <View style={styles.marginBottom}>
              <FieldPicker
                enabled
                type="Source"
                options={this.props.sources}
                selection={this.state.source}
                handleChange={source => this.setState({ source })}
              />
            </View>
            <View style={styles.marginBottom}>
              <FieldPicker
                enabled
                type="Tag"
                options={this.props.tags}
                selection={this.state.tag}
                handleChange={tag => this.setState({ tag })}
              />
            </View>

            <View style={styles.marginBottom}>
              <Item style={[globalStyles.formItem, globalStyles.alignRight]}>
                <Label style={globalStyles.label}>
                  From
              </Label>
                <DatePickerInput
                  date={this.state.dateFrom}
                  changeDate={dateFrom => this.setState({ dateFrom })} />
              </Item>
            </View>
            <View style={styles.marginBottom}>
              <Item style={[globalStyles.formItem, globalStyles.alignRight]}>
                <Label style={globalStyles.label}>
                  To
              </Label>
                <DatePickerInput
                  date={this.state.dateTo}
                  changeDate={dateTo => this.setState({ dateTo })} />
              </Item>
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
    marginTop: headerHeight,
    backgroundColor: bodyBackgroundColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    borderColor: outlineColor,
    borderWidth: 1,
  },
  form: {
    width: "90%",
  },
  marginBottom: {
    marginBottom: 15
  }
})

mapStateToProps = ({ authors, categories, sources, tags }) => ({
  authors,
  categories,
  sources,
  tags
})

export default connect(mapStateToProps, {updateResults})(SearchDrawer)