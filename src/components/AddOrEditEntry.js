import React from 'react'
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import {
  Form,
  Icon,
  Item,
  Label,
  Textarea,
} from 'native-base'

import {connect} from 'react-redux'
import moment from 'moment'
import Tags from 'react-native-tags'
import ImagePicker from 'react-native-image-picker'

import SearchIconAndStatusColor from './SearchIconAndStatusColor';
import DatePickerInput from './DatePicker'
import FieldPicker from './FieldPicker'
import NewInput from './NewInput'
import Button from './Button'

import imageToText from '../lib/imageToText'
import showToast from '../lib/showToast'
import { Entry } from '../models/realm'

import {globalStyles} from '../config/globalStyles'

class AddOrEditEntry extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('entry', false) ? 'Edit Entry' : 'Add Entry',
    headerRight: 
      <SearchIconAndStatusColor navigation={navigation}
        statusBarColor={navigation.getParam('statusBarColor', '#3C8C90')} />,
    headerStyle: {
      backgroundColor: navigation.getParam('primaryColor', '#3C8C90'),
    },
    headerTintColor: navigation.getParam('secondaryColor', '#fff')
  })

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

  constructor(props) {
    super(props)
    this.updateHeaderTheme()
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
    this.refs._scrollView.scrollTo({ offset: 0, animated: false });
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
      return showToast("Entry needs content at least", "danger")
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

  pickImage = () => {
    const options = {
      title: 'Capture text from an image',
      cameraType: 'back',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a photo of text',
      chooseFromLibraryButtonTitle: 'Pick an image of text',
      quality: 1,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        showToast("Processing image - why not fill in other fields while you wait?", "default", 10000)
        imageToText(response.data)
          .then(content => {
            showToast("Image processing complete", "success")
            this.setState({ content })
          })
          .catch(err =>
            showToast(err || "Could not connect to server...", "danger")
          )
      }
    })
  }

  render() {

    const {bodyTextColor, primaryColor, bodyBackgroundColor, deleteColor, buttonPrimary} = this.props.theme

    return (

      <ScrollView 
        ref="_scrollView"
        contentContainerStyle={[
            styles.home,
           {backgroundColor: bodyBackgroundColor}
          ]}
        >
        <Form style={styles.form}>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <View style={{ width: "80%" }}>
                <Label style={[globalStyles.label, {color: bodyTextColor}]}>
                  Content
                </Label>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => alert('voice')}>
                  <Icon
                    ios={"microphone"}
                    android={"microphone"}
                    type={"FontAwesome"}
                    style={{
                      color: bodyTextColor,
                      fontSize: 24
                    }} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this.pickImage}>
                  <Icon
                    ios={"camera"}
                    android={"camera"}
                    type={"FontAwesome"}
                    style={{
                      color: bodyTextColor,
                      fontSize: 24,
                      marginLeft: 18
                    }} />
                </TouchableOpacity>
              </View>
            </View>
            <Textarea 
              rowSpan={6}
              style={[
                 globalStyles.input,
                 styles.marginBottom, 
                 {width: '100%',
                 fontSize: 16},
                ]}
              value={this.state.content}
              onChangeText={content => this.setState({content})}
            />
          </View>

          <View style={styles.marginBottom}>
            <Item style={[globalStyles.formItem, globalStyles.alignRight]}>
              <Label style={[globalStyles.label, { color: bodyTextColor }]}>
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
              bodyTextColor={bodyTextColor}
              label
            />
            <NewInput
              switchOn={this.state.newCategory}
              bodyTextColor={bodyTextColor}
              primaryColor={primaryColor}
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
              bodyTextColor={bodyTextColor}
              label
            />
            <NewInput
              switchOn={this.state.newAuthor}
              bodyTextColor={bodyTextColor}
              primaryColor={primaryColor}
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
              bodyTextColor={bodyTextColor}
              label
            />
            <NewInput
              switchOn={this.state.newSource}
              bodyTextColor={bodyTextColor}
              primaryColor={primaryColor}
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
              <Label style={[globalStyles.label, { color: bodyTextColor }]}>
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
              <Label style={[globalStyles.label, {color: bodyTextColor}]}>
                Tags
              </Label>
            <Tags
              initialText=""
              textInputProps={{
                placeholder: "Enter tags"
              }}
              initialTags={this.state.tags}
              onChangeTags={tags => this.setState({tags})}
              containerStyle={globalStyles.input}
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
              buttonColor={buttonPrimary}
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
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  contentHeader: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 5
  },
  marginBottom: {
    marginBottom: 20
  }
})

mapStateToProps = ({authors, categories, sources, tags, theme}) => ({
  authors,
  categories,
  sources,
  tags,
  theme
})

export default connect(mapStateToProps)(AddOrEditEntry)
