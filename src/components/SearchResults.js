import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import SearchIconAndStatusColor from './SearchIconAndStatusColor';

class SearchResults extends React.Component {

  static navigationOptions = ({navigation}) => ({ 
    title: 'Search Results',
    headerRight: <SearchIconAndStatusColor navigation={navigation} />
  })

  render() {
    return (
      <View style={styles.home}>
        <Text style={styles.header}>This is the Search Results</Text>
        <Button
          title="View Entry"
          onPress={() => this.props.navigation.navigate('ViewEntry')}
        />
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

export default SearchResults
