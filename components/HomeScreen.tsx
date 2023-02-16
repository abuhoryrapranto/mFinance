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

function HomeScreen({navigation}: {navigation: any}) {

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
            <Text onPress={() => navigation.navigate('Note')} style={[styles.section1_1, {borderColor: 'white'}]}>Notes</Text>
          </View>

          <View style={styles.section2}>
            <View style={[styles.section2_1, {backgroundColor: '#0FE38A', borderColor: '#0FE38A'}]}>
                <Text style={styles.section2_1_1}>Income</Text>
                <Text style={styles.section2_1_1}>10.00 $</Text>
            </View>
            <View style={[styles.section2_1, {backgroundColor: '#FD6868', borderColor: '#FD6868'}]}>
                <Text style={[styles.section2_1_1, {color: 'white'}]}>Expense</Text>
                <Text style={[styles.section2_1_1, {color: 'white'}]}>10.00 $</Text>
            </View>
            <View style={[styles.section2_1, {backgroundColor: '#FFFFFF', borderColor: '#FFFFFF'}]}>
                <Text style={styles.section2_1_1}>Total</Text>
                <Text style={styles.section2_1_1}>10.00 $</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => navigation.navigate('Add')}>
            <MaterialIcons name="add" color="black" size={40} />
          </TouchableOpacity>

          

        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    
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

  section2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },

  section2_1: {
    width: '30%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 5
  },

  section2_1_1: {
    padding: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500'
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