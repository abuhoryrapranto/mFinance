import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function HomeScreen() {

  let [currentDate, setCurrentDate] = useState(moment(new Date()).format());

  let addDay = () => {
    let newDate = moment(currentDate).add(1, 'days').format();
    setCurrentDate(newDate);
  }

  let subDay = () => {
    let newDate = moment(currentDate).subtract(1, 'days').format();
    setCurrentDate(newDate);
  }

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.currentDateView}>
              <MaterialIcons onPress={subDay} name="keyboard-arrow-left" color="white" size={30} />
              <Text style={styles.currentDateText}>{moment(currentDate).format('Do MMMM YYYY, (ddd)')}</Text>
              <MaterialIcons onPress={addDay} name="keyboard-arrow-right" color="white" size={30} />
          </View>

          <View style={styles.section1}>
            <Text style={styles.section1_1}>Today</Text>
            <Text style={styles.section1_1}>Weekly</Text>
            <Text style={styles.section1_1}>Monthly</Text>
            <Text style={styles.section1_1}>Notes</Text>
          </View>

        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    
  },
  currentDateView: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  currentDateText: {
    color: '#0FE38A',
    fontSize: 17,
  },

  section1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  section1_1: {
    width: '23%',
    height: '5%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
    textAlign: 'center',
    padding: 7,
    color: 'white',
  }

});

export default HomeScreen;