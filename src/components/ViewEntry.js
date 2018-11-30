import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import SearchIconAndStatusColor from './SearchIconAndStatusColor'

class ViewEntry extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'My Entry',
    headerRight: <SearchIconAndStatusColor navigation={navigation} />
  })

  render() {
    return (
      <View style={styles.home}>
        <Text style={styles.header}>This is the View Entry form</Text>
        <Text>Placeholder text</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: "bold"
  }
})

export default ViewEntry
