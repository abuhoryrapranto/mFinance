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
    Dimensions,
  } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';

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

    const categoryExpense = [
        { label: 'Food', value: 'Food' },
        { label: 'Transport', value: 'Transport' },
        { label: 'Household', value: 'Household' },
        { label: 'Bills', value: 'Bills' },
        { label: 'Cloths', value: 'Cloths' },
        { label: 'Gifts', value: 'Gifts' },
        { label: 'Health', value: 'Health' },
        { label: 'Others', value: 'Others' },
    ];

    const categoryIncome = [
        { label: 'Salary', value: 'Salary' },
        { label: 'Cash', value: 'Cash' },
        { label: 'Bonus', value: 'Bonus' },
        { label: 'Others', value: 'Others' },
    ];

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
                
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Category</Text>
                    <RNPickerSelect style={pickerSelectStyles}
                        onValueChange={(value) => console.log(value)}
                        items={tabChange === 1 ? categoryExpense : categoryIncome}
                    />
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Account Type</Text>
                    <RNPickerSelect style={pickerSelectStyles}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Cash', value: 'Cash' },
                            { label: 'Card', value: 'Card' }, 
                        ]}
                    />
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Note</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

                <View>
                    <TouchableOpacity style={styles.saveBtn}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>Save</Text>
                    </TouchableOpacity>
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

      saveBtn: {
        borderColor: '#0FE38A',
        borderRadius: 5,
        backgroundColor: '#0FE38A',
        marginTop: 30,
        padding: 13,
        alignItems: 'center',
      }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        flex: 1,
        borderWidth: 1,
        paddingTop: 17,
        paddingLeft: 10,
        paddingBottom: 17,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
        width: Dimensions.get('window').width / 1.45
    },
});

export default Add;