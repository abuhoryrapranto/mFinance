import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function HomeScreen() {

  let [currentDate, setCurrentDate] = useState(moment(new Date()).format());
  let [borderColor, setBorderColor] = useState(1);

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
            <Text onPress={() => setBorderColor(1)} style={[styles.section1_1, {borderColor: borderColor == 1 ? '#0FE38A' : 'white'}]}>Today</Text>
            <Text onPress={() => setBorderColor(2)} style={[styles.section1_1, {borderColor: borderColor == 2 ? '#0FE38A' : 'white'}]}>Weekly</Text>
            <Text onPress={() => setBorderColor(3)} style={[styles.section1_1, {borderColor: borderColor == 3 ? '#0FE38A' : 'white'}]}>Monthly</Text>
            <Text onPress={() => setBorderColor(4)} style={[styles.section1_1, {borderColor: borderColor == 4 ? '#0FE38A' : 'white'}]}>Notes</Text>
          </View>

          <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
          <MaterialIcons name="add" color="black" size={40} />
          </TouchableOpacity>

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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  section1_1: {
    width: '23%',
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 3,
    textAlign: 'center',
    color: 'white',
  },

  fab: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    width: 45,  
    height: 45,   
    borderRadius: 5,            
    backgroundColor: 'white',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
  }

});

export default HomeScreen;