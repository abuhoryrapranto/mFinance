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
    Alert,
  } from 'react-native';

import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Button from './Button';

function Budget({navigation}: {navigation: any}) {

    const isFocused = useIsFocused();

    let [budget, setBudget] = useState<Float>(0);
    let [saveBudget, setSaveBudget] = useState('');

    const getBudget = async () => {

        const data = await AsyncStorage.getItem('@budget');

        if(data) {
            setBudget(parseFloat(data));
        }
    }

    const saveManualBudget = async () => {

        try {

            await AsyncStorage.setItem('@budget', saveBudget);

            setBudget(parseFloat(saveBudget));

            console.log('success');

            Alert.alert('Budget saved successfully', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

            setSaveBudget('');

        } catch(e) {
            
            console.log(e);
        }
    }

    const deleteBudget = async () => {

        try {
            await AsyncStorage.removeItem('@budget');
            setBudget(0);
            Alert.alert('Budget deleted successfully', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            
          } catch(e) {
                console.log(e);
          }
    }

    useEffect(() => {

        getBudget();
         
    }, [isFocused]);

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headSection}>
                    <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                    <Text style={{fontSize: 17, color: "white"}}>Budget</Text>
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <Text style={{color: 'white', fontSize: 17, fontWeight: '700'}}>Your annual budget is: £{budget.toFixed(2)}</Text>
                    {
                        budget !== 0 ? 
                        <TouchableOpacity style={{flex: 1}} onPress={deleteBudget}>
                            <Text style={{textAlign: 'right', fontSize: 17, color: '#FD6868'}}>Delete</Text>
                        </TouchableOpacity> : 
                        ""
                    }
                </View>

                
                <Text style={{color: 'white', fontSize: 15, marginTop: 20}}>Manually Select Budget (Annually)</Text>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput style={styles.input} keyboardType='numeric' value={saveBudget} onChangeText={newValue => setSaveBudget(newValue)}></TextInput>
                </View>

                <Button name="Save" fontSize={18} fontWeight="700" marginTop={25} myFunc={saveManualBudget} />

                <View>
                    <TouchableOpacity style={styles.predictBtn} onPress={() => navigation.navigate('Predict')}>
                    <Text style={{color: 'white', fontSize: 17}}>Predict Your Expense Budget With</Text>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: '700', paddingTop: 10}}>AI</Text>
                    </TouchableOpacity>
                </View>

            </View>
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

      predictBtn: {
        borderColor: '#FD6868',
        borderRadius: 5,
        backgroundColor: '#FD6868',
        marginTop: 50,
        padding: 40,
        alignItems: 'center',
    }
})

export default Budget;