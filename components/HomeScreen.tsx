import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    Animated,
  } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function HomeScreen({navigation}: {navigation: any}) {

  const isFocused = useIsFocused();

  let [currentDate, setCurrentDate] = useState(moment(new Date()).format());
  let [borderColor, setBorderColor] = useState(1);
  const [incExp, setIncExp] = useState<any[]>([]);

  let addDay = () => {
    let newDate = moment(currentDate).add(1, 'days').format();
    setCurrentDate(newDate);
  }

  let subDay = () => {
    let newDate = moment(currentDate).subtract(1, 'days').format();
    setCurrentDate(newDate);
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@incExp')
      if(value !== null) {
        setIncExp(JSON.parse(value));
        console.log('Done');
      }
    } catch(e) {
      console.log(e);
    }
  }

  const swipeRight = (progress : any,dragX : any) =>{
    const scale = dragX.interpolate({
      inputRange:[-200,0],
      outputRange:[1,0.5],
      extrapolate:'clamp'
    })
    return(
      <Animated.View style={{backgroundColor:'#FD6868',width:"40%",justifyContent:'center', borderBottomColor: 'white', borderBottomWidth: 1}}>
        <Animated.Text style={{marginLeft:'auto',marginRight:50, fontSize:15, fontWeight:'bold', color:'white', transform:[{scale}]}}>Delete</Animated.Text>
      </Animated.View>
    )
  }

useEffect(() => {
    getData();
}, [isFocused]);

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

          <View style={{marginTop: 20, borderBottomColor: 'white', borderBottomWidth: 1}}></View>

          <ScrollView>

            {
              incExp.length > 0 ?
              <>

              {
                incExp.map(item => (

                  <Swipeable key={item.id} renderRightActions={swipeRight} rightThreshold={-200}>

                  <View style={styles.section3}>
                    <View style={styles.section3_1}>
                        <Text style={{color: 'white'}}>{item.category}</Text>
                    </View>
                    <View style={styles.section3_1}>
                        <Text style={{color: 'white', fontWeight: '700'}}>{item.note != '' ? item.note : 'No Descr.' }</Text>
                        <Text style={{color: 'white'}}>{item.accountType}</Text>
                    </View>
                    <View style={styles.section3_1}>
                        <Text style={{color: item.type == 'Expense' ? '#FD6868' : '#0FE38A'}}>{item.amount} $</Text>
                    </View>
                  </View>

                  </Swipeable>

                ))
              }

              
              
              </>
              : <Text>No Data Found!</Text>
            }

          </ScrollView>

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

  section3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    borderBottomWidth: 1, 
    borderBottomColor: 'white',
  },

  section3_1: {
    width: '30%',
    padding: 12
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