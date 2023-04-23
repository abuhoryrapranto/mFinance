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
    Alert,
  } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

function Edit({route, navigation} : any) {

    const [type, setType] = useState(route.params.type);
    const [date, setDate] = useState(new Date(route.params.date));
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(route.params.amount);
    const [category, setCategory] = useState(route.params.category);
    const [accountType, setAccountType] = useState(route.params.accountType);
    const [note, setNote] = useState(route.params.note);

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
    
    //This function used for edit income or expense data.
    const update = async () => {

        if(date == null) {

            Alert.alert('Date can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }

        else if(amount == '') {
            
            Alert.alert('Amount can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);

        } 

        else if(category == null) {
            
            Alert.alert('Category can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);

        }

        else if(accountType == null) {
            
            Alert.alert('Account Type can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

        } 
        
        else {
            
            const incExp = await AsyncStorage.getItem('@incExp');
            let data : Array<any> = [];

            if(incExp) {
                data = JSON.parse(incExp);
            }
            const newIncExp = data.filter((item, index) => item.id != route.params.id);

            let addItem : any = {
                id: uuid.v4(),
                type: type,
                date: date,
                amount: parseFloat(amount).toFixed(2),
                category: category,
                accountType: accountType,
                note: note == '' ? '' : note
            }
    
            try {
    
                if(newIncExp !== null) {
                
                    newIncExp.push(addItem);
                    
                    await AsyncStorage.setItem('@incExp', JSON.stringify(newIncExp));

                    Alert.alert(type == 'Income' ? 'Income updated successfully' : 'Expense updated successfully', '', [
                
                        {text: 'OK', onPress: () => navigation.goBack()},
                    ]);

                    console.log('success');
    
                } else {

                    await AsyncStorage.setItem('@incExp', JSON.stringify([addItem]));

                    Alert.alert(type == 'Income' ? 'Income updated successfully' : 'Expense updated successfully', '', [
                
                        {text: 'OK', onPress: () => navigation.goBack()},
                    ]);

                    console.log('success');
                }
            } catch(e) {
    
                console.log(e);
            }
        }
    }

    return(
        <SafeAreaView>
            <KeyboardAvoidingView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.headSection} onPress={() => navigation.goBack()} >
                    <MaterialIcons name="arrow-back-ios" color="white" size={20}/>
                    <Text style={{fontSize: 17, color: "white"}}>Edit</Text>
                </TouchableOpacity>

                <View style={styles.section2}>
                    <TouchableOpacity style={[styles.section2_1, {backgroundColor: type === 'Income' ? '#0FE38A' : 'transparent', borderColor: '#0FE38A'}]} onPress={() => {setType('Income'), setCategory('')}}>
                        <Text style={[styles.section2_1_1, {color: type === 'Income' ? 'black' : 'white'}]}>Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.section2_1, {backgroundColor: type === 'Expense' ? '#FD6868' : 'transparent', borderColor: '#FD6868'}]} onPress={() => {setType('Expense'), setCategory('')}}>
                        <Text style={[styles.section2_1_1, {color: 'white'}]}>Expense</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Date & Time</Text>
                    <TextInput value={date.toDateString()} style={styles.input} onPressIn={() => setOpen(true)}></TextInput>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Amount</Text>
                    <TextInput style={styles.input} keyboardType='numeric' value={amount} onChangeText={newAmount => setAmount(newAmount)}></TextInput>
                </View>
                
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Category</Text>
                    <RNPickerSelect style={pickerSelectStyles}
                        value={category}
                        onValueChange={(value) => setCategory(value)}
                        useNativeAndroidPickerStyle={false}
                        items={type === 'Expense' ? categoryExpense : categoryIncome}
                    />
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Account Type</Text>
                    <RNPickerSelect style={pickerSelectStyles}
                        value={accountType}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => setAccountType(value)}
                        items={[
                            { label: 'Cash', value: 'Cash' },
                            { label: 'Card', value: 'Card' }, 
                        ]}
                    />
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, width: 100}}>Note</Text>
                    <TextInput style={styles.input} value={note} onChangeText={newNote => setNote(newNote)}></TextInput>
                </View>

                <View>
                    <TouchableOpacity style={styles.saveBtn} onPress={update}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>Update</Text>
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
        marginTop: 5,
      },
    
    input: {
        flex: 1,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
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
    inputAndroid: {
        borderWidth: 1,
        paddingTop: 3,
        paddingLeft: 10,
        paddingBottom: 3,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
        width: Dimensions.get('window').width / 1.41
    },
});

export default Edit;