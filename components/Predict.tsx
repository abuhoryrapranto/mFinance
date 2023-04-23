import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    ActivityIndicator
  } from 'react-native';

import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Button';

function Predict({navigation}: {navigation: any}) {

    const [inc, setInc] = useState('');
    const [fm, setFM] = useState('');
    let [pre, setPre] = useState(0);
    let [loading, setLoading] = useState(false);

    //This function fetch Machine Learning model api response and save data in state.
    const predict = async () => {

        if(inc == '') {

            Alert.alert('Total income can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

        } else if(fm == '') {

            Alert.alert('Num of family members can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

        } else {

            const data : any = {
                total_income : parseInt(inc),
                family_members: parseInt(fm)
            }
    
            try {

                setLoading(true);

                const response : any = await fetch('https://budget-he1u.onrender.com/predict', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(data)
                });
    
                const result = await response.json();
                setPre(result.data);

                setLoading(false);
      
              } catch (error) {
      
                console.error(error);
              }
        }
    }

    //This function helps to save predict data in async storage.
    const savePredictBudget = async () => {

        try {

            if(!pre) {

                Alert.alert('Budget not predicted yet.', '', [
                
                    {text: 'OK', onPress: () => navigation.goBack()},
                ]); 

            } else {

                setLoading(true);

                await AsyncStorage.setItem('@budget', pre.toString());

                setLoading(false);

                console.log('success');

                Alert.alert('Budget saved successfully', '', [
                    
                    {text: 'OK', onPress: () => navigation.goBack()},
                ]);

            }

            

        } catch(e) {
            
            console.log(e);
        }
    }

    useEffect(() => {
       
    }, []);

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.headSection} onPress={() => navigation.goBack()} >
                    <MaterialIcons name="arrow-back-ios" color="white" size={20}/>
                    <Text style={{fontSize: 17, color: "white"}}>Predict Budget</Text>
                </TouchableOpacity>

                
                <Text style={{color: 'white', fontSize: 15, marginTop: 20}}>Expected Income (Annually)</Text>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput style={styles.input} keyboardType='numeric' value={inc} onChangeText={newValue => setInc(newValue)}></TextInput>
                </View>

                <Text style={{color: 'white', fontSize: 15, marginTop: 20}}>No of Family Members</Text>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput style={styles.input} keyboardType='numeric' value={fm} onChangeText={newValue => setFM(newValue)}></TextInput>
                </View>

                {
                    loading == false ?

                    <View style={{alignItems: "center", marginTop: 70}}>
                        <TouchableOpacity style={{backgroundColor: '#FD6868', height: 100, width: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}} onPress={predict}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>Predict</Text>
                        </TouchableOpacity>
                    </View> :

                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 70}}>
                        <ActivityIndicator size="large" color="#00ff00" />
                        <Text style={{color: "white"}}>Loading</Text>
                    </View>

                }

                {
                    pre > 0 ?
                    <>
                        <Text style={{color: 'white', fontSize: 17, fontWeight: '500', textAlign: 'center', marginTop: 30}}>Your Annual Budget Should Be <Text style={{color: "#0FE38A"}}>£{pre}</Text></Text>

                        <Button name="Save" fontSize={18} fontWeight="700" marginTop={25} padding={20} myFunc={savePredictBudget} />
                    </>
                    
                    : ""
                }

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

export default Predict;