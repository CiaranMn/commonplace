import React from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import {
  Form,
  Item,
  Label,
  Textarea,
  Toast
} from 'native-base'

import {connect} from 'react-redux'
import moment from 'moment'
import Tags from 'react-native-tags'

import SearchIconAndStatusColor from './SearchIconAndStatusColor';
import DatePickerInput from './DatePicker'
import FieldPicker from './FieldPicker'
import NewInput from './NewInput'
import Button from './Button'

import { Entry } from '../models/realm'
import {
  globalStyles, 
  primaryColor, 
  secondaryColor,
  deleteColor
} from '../config/globalStyles'

class AddOrEditEntry extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('entry', false) ? 'Edit Entry' : 'Add Entry',
    headerRight: <SearchIconAndStatusColor navigation={navigation} />
  })

  constructor(props) {
    super(props)
    const entry = this.props.navigation.getParam('entry', false)
    this.state = {
      content: entry.content || '',
      category: entry.category ? entry.category.name : '',
      date: entry.date 
            ? 
            moment(entry.date).format('DD-MM-YYYY')
            :
            moment().format('DD-MM-YYYY'),
      entry,
      newCategory: false,
      newCategoryText: '',
      author: entry.author ? entry.author.name : '',
      newAuthor: false,
      newAuthorText: '',
      source: entry.source ? entry.source.name : '',
      newSource: false,
      newSourceText: '',
      reference: entry.reference || '',
      tags: entry.tags ?
         entry.tags.map(tag => tag.name) 
         : 
         [],
      tagText: ''
    }
  }

  componentDidMount() {
    this._blurListener = this.props.navigation.addListener('didBlur', this.scrollToTop)
  }

  componentWillUnmount() {
    this._blurListener.remove()
  }

  scrollToTop = () => {
    this.refs._scrollView.scrollTo({ offset: 0, animated: true });
  }

  createOrUpdateEntry = () => {
    const {
      entry,
      content, 
      date, 
      category, newCategory, newCategoryText, 
      author, newAuthor, newAuthorText, 
      source, newSource, newSourceText,
      reference, 
      tags
    } = this.state
    if (content.length === 0) {
      this.scrollToTop()
      return Toast.show({
        text: "Entry needs content at least",
        buttonText: "OK!",
        type: 'danger',
        duration: 2000,
        position: "top"
      })
    }
    Entry.createOrUpdateWithAlerts({
      content,
      date,
      category: newCategory ? newCategoryText : category,
      author: newAuthor ? newAuthorText : author,
      source: newSource ? newSourceText : source,
      reference,
      tags
    }, entry ? entry.id : false
    )
    this.resetAndGoBack()
  }

  resetAndGoBack = () => {
    this.clearForm()
    if (!this.props.navigation.goBack()) {
     this.props.navigation.navigate('Home')
    }
  }

  clearForm = () => {
    this.setState({
      content: '',
      category: '',
      date: moment().format('DD-MM-YYYY'),
      entry: false,
      newCategory: false,
      newCategoryText: '',
      author: '',
      newAuthor: false,
      newAuthorText: '',
      source: '',
      newSource: false,
      newSourceText: '',
      reference: '',
      tags: [],
      tagText: ''
    })
  }

  render() {

    return (

      <ScrollView 
        ref="_scrollView"
        contentContainerStyle={[styles.home, globalStyles.body]}
        >
        <Form style={styles.form}>
          <Item stackedLabel style={globalStyles.formItem}>
            <Label style={[globalStyles.label, {marginBottom: 6}]}>
              Content
            </Label>
            <Textarea 
              rowSpan={6}
              style={[globalStyles.input, styles.marginBottom, {width: '100%'}]}
              value={this.state.content}
              onChangeText={content => this.setState({content})}
            />
          </Item>

          <View style={styles.marginBottom}>
            <Item style={[globalStyles.formItem, globalStyles.alignRight]}>
              <Label style={globalStyles.label}>
                Date
              </Label>
              <DatePickerInput 
                date={this.state.date}
                changeDate={date => this.setState({date})} />
            </Item>
          </View>

          <View style={styles.marginBottom}>
            <FieldPicker
              enabled={!this.state.newCategory}
              type="Category"
              options={this.props.categories}
              selection={this.state.category}
              handleChange={category => this.setState({category})}
              label
            />
            <NewInput
              switchOn={this.state.newCategory}
              onSwitchValueChange={value =>
                this.setState({ newCategory: value })}
              textValue={this.state.newCategoryText}
              onTextValueChange={value =>
                this.setState({ newCategoryText: value })}
            />
          </View>

          <View style={styles.marginBottom}>
            <FieldPicker
              enabled={!this.state.newAuthor}
              type="Author"
              options={this.props.authors}
              selection={this.state.author}
              handleChange={author => this.setState({author})}
              label
            />
            <NewInput
              switchOn={this.state.newAuthor}
              onSwitchValueChange={value => this.setState({ newAuthor: value })}
              textValue={this.state.newAuthorText}
              onTextValueChange={value =>
                this.setState({ newAuthorText: value })}
            />
          </View>

          <View style={styles.marginBottom}>
            <FieldPicker
              enabled={!this.state.newSource}
              type="Source"
              options={this.props.sources}
              selection={this.state.source}
              handleChange={source => this.setState({source})}
              label
            />
            <NewInput
              switchOn={this.state.newSource}
              onSwitchValueChange={value => this.setState({ newSource: value })}
              textValue={this.state.newSourceText}
              onTextValueChange={value =>
                this.setState({ newSourceText: value })}
            />
          </View>

          <View style={styles.marginBottom}>
            <Item style={[
              globalStyles.formItem, 
              globalStyles.alignRight
              ]}>
              <Label style={globalStyles.label}>
               Reference
              </Label>
              <TextInput
                style={[
                  globalStyles.input,
                  globalStyles.textInput,
                ]}
                value={this.state.reference}
                onChangeText={reference => this.setState({reference})}
              />
            </Item>
          </View>

          <View style={styles.marginBottom}>
            <Item style={[globalStyles.formItem, globalStyles.alignRight]}>
              <Label style={globalStyles.label}>
                Tags
              </Label>
            <Tags
              initialText=""
              textInputProps={{
                placeholder: "Enter tags"
              }}
              initialTags={this.state.tags}
              onChangeTags={tags => this.setState({tags})}
              containerStyle={[
                globalStyles.input
              ]}
              inputStyle={[
                {backgroundColor: 'white'}
              ]}
              />
            </Item>
          </View> 

          <View style={[
            globalStyles.formItem,
            styles.marginBottom,
            {
              justifyContent: 'space-between',
              flexDirection: 'row',
            }
          ]}>
            <Button 
              onPress={this.resetAndGoBack}
              buttonColor={deleteColor}
              buttonText={'Cancel'}
             />
            <Button
              onPress={this.createOrUpdateEntry}
              buttonColor={primaryColor}
              buttonText={this.state.entry ? "Save changes" : "Add Entry"}
            />
          </View>

        </Form>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  form: {
    width: "80%",
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  marginBottom: {
    marginBottom: 20
  }
})

mapStateToProps = ({authors, categories, sources, tags}) => ({
  authors,
  categories,
  sources,
  tags
})

export default connect(mapStateToProps)(AddOrEditEntry)
