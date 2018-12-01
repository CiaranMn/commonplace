import React from 'react'
import {
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native'
import {
  Card,
  Text,
  Icon,
} from 'native-base';

import moment from 'moment'

import { 
  bodyTextColor, 
  outlineColor, 
  deleteColor 
} from '../config/globalStyles'

import whitePaper from '../../assets/white-oxford.jpg'

export default EntryCard = ({entry, confirmDelete, editEntry, shareEntry}) => {

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
          <View style={{width: "80%"}}>
            <Text style={{color: bodyTextColor, fontWeight: 'bold', fontSize: 15}}>
              {entry.author ? entry.author.name.substr(0,27) : 'Unknown'}
            </Text>
            <Text note>
              {entry.source ? entry.source.name : '(Unsourced)'}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
              activeOpacity={0.5}
              onPress={() => confirmDelete(entry)}>
              <Icon
                ios={"trash"}
                android={"trash"}
                type="FontAwesome"
                style={{
                  color: deleteColor,
                  fontSize: 25
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => editEntry(entry)}>
              <Icon
                ios={"pencil"}
                android={"pencil"}
                type="FontAwesome"
                style={{
                  color: bodyTextColor,
                  fontSize: 25,
                  marginLeft: 15
                }} />
            </TouchableOpacity>
          </View>
      </View>

        
      <View style={styles.cardBody}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            source={whitePaper}
            // resizeMode='contain'
            style={{flex: 1, height: undefined, width: undefined}}
            borderRadius={12}
          />
        </View>
        <ScrollView contentContainerStyle={{
          flexGrow: 1, 
          padding: 15,
          justifyContent: 'center', 
          backgroundColor: 'transparent'
        }}>
          <Text style={{
            fontSize: 17,
            marginBottom: 10,
            fontFamily: 'Poppins'
           }}>
           {entry.content}
          </Text>
        </ScrollView>
      </View>


      <View style={styles.cardFooter}>
        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between',
          flex: 1
        }}>
          <View style={{width: "90%"}}>
            {entry.reference &&
              <Text note style={{marginBottom: 5}}>
                {entry.reference}
              </Text>
            }
            <ScrollView>
              <Text note style={{fontWeight: 'bold'}}>
                {
                  entry.tags.length > 0 
                  ? 
                  'Tags: ' + entry.tags.map(tag => tag.name).join(', ')
                  :
                  null
                }
              </Text>
            </ScrollView>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => shareEntry(entry)}
            >
            <Icon
              ios={"share-square"}
              android={"share-square"}
              type="FontAwesome"
              style={{
                color: bodyTextColor,
                fontSize: 26,
                marginLeft: 5
              }} />
          </TouchableOpacity>
        </View>
        <View style={{width: "100%", alignItems: 'flex-start'}}>
          <Text note style={{fontWeight: 'bold'}}>
            Date: {moment(entry.date || entry.dateCreated).format('DD-MM-YYYY')}
          </Text>
        </View>
      
      </View>

    </Card>
  )
}

const styles = {
  card: {
    flex: 1,
    width: "90%",
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: 'grey',
    borderTopColor: 'grey',
    borderRadius: 10,
    marginLeft: Dimensions.get('screen').width * 0.05
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  cardBody: {
    width: "90%",
    height: "60%",
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomColor: outlineColor,
    borderRightColor: outlineColor,
    borderLeftColor: outlineColor,
    borderTopColor: outlineColor,
    borderRadius: 12
  },
  cardFooter: {
    flex: 2,
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10
  }
}