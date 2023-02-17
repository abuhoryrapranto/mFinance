import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
  } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';

function Add({navigation}: {navigation: any}) {

    const [headerText, setHeaderText] = useState('Expense');
    const [tabChange, setTabChange] = useState(1);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const chnageTab = (num : number) => {

        if(num === 0) {

            setTabChange(0);
            setHeaderText('Income');

        } else {

            setTabChange(1);
            setHeaderText('Expense');
        }
    }

    // useEffect(() => {
    //     chnageTab;
    // }, []);



    return(
        <SafeAreaView>
            <KeyboardAvoidingView>
            <View style={styles.container}>
                <View style={styles.headSection}>
                    <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                    <Text style={{fontSize: 17, color: "white"}}>{headerText}</Text>
                </View>

                <View style={styles.section2}>
                    <TouchableOpacity style={[styles.section2_1, {backgroundColor: tabChange === 0 ? '#0FE38A' : 'transparent', borderColor: '#0FE38A'}]} onPress={() => chnageTab(0)}>
                        <Text style={[styles.section2_1_1, {color: tabChange === 0 ? 'black' : 'white'}]}>Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.section2_1, {backgroundColor: tabChange === 1 ? '#FD6868' : 'transparent', borderColor: '#FD6868'}]} onPress={() => chnageTab(1)}>
                        <Text style={[styles.section2_1_1, {color: 'white'}]}>Expense</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Date & Time</Text>
                    <TextInput value={date.toDateString()} style={styles.input} onPressIn={() => setOpen(true)}></TextInput>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Amount</Text>
                    <TextInput style={styles.input} keyboardType='numeric'></TextInput>
                </View>

            </View>

            <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    }}
                    onCancel={() => {
                    setOpen(false)
                    }}
            />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        marginLeft: 10,
        marginRight: 10
    },

    headSection: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
    input: {
        flex: 1,
        height: 35,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
    },

    section2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        marginTop: 20,
      },
    
      section2_1: {
        width: '40%',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5
      },
    
      section2_1_1: {
        padding: 1,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500'
      },
})

export default Add;