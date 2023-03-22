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
    Alert,
  } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

function HomeScreen({navigation}: {navigation: any}) {

  const isFocused = useIsFocused();
  const swipeableRef = useRef<Swipeable[]>([]);

  let [currentDate, setCurrentDate] = useState(moment(new Date()).format());
  let [borderColor, setBorderColor] = useState(1);
  const [incExp, setIncExp] = useState<any[]>([]);
  let [income, setIncome] = useState<Float>(0);
  let [expense, setExpense] = useState<Float>(0);
  const [cost, setCost] = useState<any[]>([]);

  let addDay = () => {
    let newDate = moment(currentDate).add(1, 'days').format();
    setCurrentDate(newDate);
  }

  let subDay = () => {
    let newDate = moment(currentDate).subtract(1, 'days').format();
    setCurrentDate(newDate);
  }

  const getDataByDate = async () => {

    let sumInc : Float = 0;
    let sumExp : Float = 0;

    try {

      const value = await AsyncStorage.getItem('@incExp')

      if(value) {

        const data : Array<any> = JSON.parse(value);

        let filterData : any;
        
        if(borderColor == 1) {

          filterData = data.filter(item => new Date(item.date).toDateString()  == new Date(currentDate).toDateString());

        } else if(borderColor == 2) {

          filterData = data.filter(item => moment(item.date).week()  == moment(new Date(currentDate)).week() && moment(item.date).year() == moment(new Date(currentDate)).year());

        } else if(borderColor == 3) {

          filterData = data.filter(item => moment(item.date).month()  == moment(new Date(currentDate)).month() && moment(item.date).year() == moment(new Date(currentDate)).year());

        } else {

          filterData = data.filter(item => new Date(item.date).toDateString()  == new Date(currentDate).toDateString());
        }

        
        setIncExp(filterData);

        filterData.map((item : any) => {

          if(item.type == 'Income') {

            sumInc += parseFloat(item.amount);

          }

          if(item.type == 'Expense') {

            sumExp += parseFloat(item.amount);
          }

        })

        setIncome(sumInc);
        setExpense(sumExp);
      }
    } catch(e) {
        console.log(e);
    }
  }

  const swipeRight = (progress : any, dragX : any, index: number, uuid : any) =>{
    const scale = dragX.interpolate({
      inputRange:[-200,0],
      outputRange:[1,0.5],
      extrapolate:'clamp'
    })
    return(
      <TouchableOpacity style={{backgroundColor:'#FD6868',width:"40%",justifyContent:'center', borderBottomColor: 'white', borderBottomWidth: 1}} onPress={() => deleteIncExp(index, uuid)}>
        <Animated.View>
          <Animated.Text style={{marginLeft:'auto',marginRight:50, fontSize:15, fontWeight:'bold', color:'white', transform:[{scale}]}}>Delete</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }


  const deleteIncExp = async (index : number, uuid : any) => {

    const newIncExp = incExp.filter((item, index) => item.id != uuid);
    
    console.log(newIncExp);
    await AsyncStorage.setItem('@incExp', JSON.stringify(newIncExp));
    swipeableRef.current?.[index].close();
    getDataByDate();
  }

useEffect(() => {

   getDataByDate();
}, [isFocused, currentDate, borderColor]);


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
                <Text style={styles.section2_1_1}>£{income.toFixed(2)}</Text>
            </View>
            <View style={[styles.section2_1, {backgroundColor: '#FD6868', borderColor: '#FD6868'}]}>
                <Text style={[styles.section2_1_1, {color: 'white'}]}>Expense</Text>
                <Text style={[styles.section2_1_1, {color: 'white'}]}>£{expense.toFixed(2)}</Text>
            </View>
            <View style={[styles.section2_1, {backgroundColor: '#FFFFFF', borderColor: '#FFFFFF'}]}>
                <Text style={styles.section2_1_1}>Total</Text>
                <Text style={styles.section2_1_1}>£{(income - expense).toFixed(2)}</Text>
            </View>
          </View>

          <View style={{marginTop: 20, borderBottomColor: 'white', borderBottomWidth: 1}}></View>

            {
              incExp.length > 0 ?
              <>

              <ScrollView>

              {
                incExp.map((item, index) => (


                  <Swipeable key={item.id} renderRightActions={(progress, dragX) => swipeRight(progress, dragX, index, item.id)} rightThreshold={-200} ref={(ref) => {if(ref) swipeableRef.current.push(ref)}}>

                  <View style={styles.section3}>
                    <View style={styles.section3_1}>
                        <Text style={{color: 'white'}}>{item.category}</Text>
                    </View>
                    <View style={styles.section3_1}>
                        <Text style={{color: 'white', fontWeight: '700'}}>{item.note != '' ? item.note : 'No Descr.' }</Text>
                        <Text style={{color: 'white'}}>{item.accountType}</Text>
                    </View>
                    <View style={styles.section3_1}>
                        <Text style={{color: item.type == 'Expense' ? '#FD6868' : '#0FE38A'}}>£{item.amount}</Text>
                    </View>
                  </View>

                  </Swipeable>

                ))
              }

            </ScrollView>

              
              
              </>
              : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <MaterialIcons name="error-outline" color="white" size={35} />
                  <Text style={{color: 'white', fontWeight: '700', marginTop: 5}}>No Data Found!</Text>
              
              </View>
            }

          

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
    textAlignVertical: 'center',
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