import React, { useState, useEffect } from 'react';  
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
    FlatList,
    Dimensions,
    Alert,
  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import RNPickerSelect from 'react-native-picker-select';

function AddCard({navigation}: {navigation: any}) {

    const [cType, setCtype] = useState("");
    const [cNum, setCnum] = useState("");
    const [cName, setCname] = useState("");
    const [cxm, setCxm] = useState("");
    const [cxy, setCxy] = useState("");
    const [cvc, setCvc] = useState("");


    const saveCard = async () => {

        if(cType == '') {

            Alert.alert('Card type can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }

        else if(cName == '') {
            
            Alert.alert('Card holder name can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);

        } 

        else if(cNum == '') {
            
            Alert.alert('Card number can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);

        }

        else if(cxm == '') {
            
            Alert.alert('Card expiry month can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

        }
        
        else if(cxy == '') {
            
            Alert.alert('Card expiry year can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

        }

        else if(cvc == '') {

            Alert.alert('CVC can not be empty', '', [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

        }

        else {

            if(cNum.length > 16 || cNum.length < 16) {

                Alert.alert('Card Number length can not be more/less than 16', '', [
                    
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
    
            }

            else if(cvc.length > 3 || cvc.length < 3) {

                Alert.alert('CVC length can not be more/less than 3', '', [
                    
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
    
            }

            let cardData : any = {
                id: uuid.v4(),
                cType: cType,
                cNum: cNum,
                cName: cName,
                cxm: cxm,
                cxy: cxy,
                cvc: cvc
            }
    
            try {
    
                const data = await AsyncStorage.getItem('@card');
    
                if(data !== null) {
    
                    let parseCard = JSON.parse(data);
                    parseCard.push(cardData);
    
                    await AsyncStorage.setItem('@card', JSON.stringify(parseCard));
    
                } else {
    
                    await AsyncStorage.setItem('@card', JSON.stringify([cardData]));
                }
    
                console.log('success');

                navigation.navigate('Card');
    
            } catch(e) {
    
                console.log(e);
            }

        }
    }

    useEffect(() => {

        
     }, []);

    return(
            <SafeAreaView style={{flex: 1}}>

                <View style={styles.container}>
                    <View style={styles.headSection}>
                        <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                        <Text style={{fontSize: 17, color: "white"}}>Add Card</Text>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{color: 'white', fontSize: 15, width: '100%'}}>Card Type</Text>
                        <RNPickerSelect style={pickerSelectStyles}
                            value={cType}
                            onValueChange={(value) => setCtype(value)}
                            items={[
                                { label: 'VISA', value: 'VISA' },
                                { label: 'Master Card', value: 'Master Card' }, 
                            ]}
                        />
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{color: 'white', fontSize: 15, width: '100%'}}>Card Holder Name</Text>
                        <TextInput style={styles.input} value={cName} onChangeText={value => setCname(value)}></TextInput>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{color: 'white', fontSize: 15, width: '100%'}}>Card Number</Text>
                        <TextInput style={styles.input} keyboardType='numeric' value={cNum} onChangeText={value => setCnum(value)}></TextInput>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{color: 'white', fontSize: 15, width: '100%'}}>Expiry Date</Text>
                        <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={{color: 'white'}}>Month</Text>
                                <RNPickerSelect style={pickerSelectStyles2}
                                    value={cxm}
                                    onValueChange={(value) => setCxm(value)}
                                    items={[
                                        { label: '01', value: '01' },
                                        { label: '02', value: '02' }, 
                                        { label: '03', value: '03' },
                                        { label: '04', value: '04' }, 
                                        { label: '05', value: '05' },
                                        { label: '06', value: '06' }, 
                                        { label: '07', value: '07' },
                                        { label: '08', value: '08' }, 
                                        { label: '09', value: '09' },
                                        { label: '10', value: '10' }, 
                                        { label: '11', value: '11' },
                                        { label: '12', value: '12' }, 
                                    ]}
                                />
                            </View>
                            <View style={{flex: 1, paddingLeft: 10}}>
                                <Text style={{color: 'white'}}>Year</Text>
                                <RNPickerSelect style={pickerSelectStyles2}
                                    value={cxy}
                                    onValueChange={(value) => setCxy(value)}
                                    items={[
                                        { label: '23', value: '23' },
                                        { label: '24', value: '24' }, 
                                        { label: '25', value: '25' },
                                        { label: '26', value: '26' }, 
                                        { label: '27', value: '27' },
                                        { label: '28', value: '28' }, 
                                        { label: '29', value: '29' },
                                        { label: '30', value: '30' }, 
                                    ]}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{color: 'white', fontSize: 15, width: '100%'}}>CVC</Text>
                        <TextInput style={styles.input} value={cvc} onChangeText={value => setCvc(value)}></TextInput>
                    </View>

                    <TouchableOpacity style={{backgroundColor: '#0FE38A', borderRadius: 5, padding: 10, marginTop: 30, width: '100%'}} onPress={saveCard} >
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 17, fontWeight: '500'}}>Save</Text>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({

    container: {
        marginLeft: 10,
        marginRight: 10,
    },

    headSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
        marginTop: 5,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
        marginTop: 5,
        paddingLeft: 5,
    }
});

const pickerSelectStyles2 = StyleSheet.create({
    inputIOS: {
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
        marginTop: 5,
        paddingLeft: 5,
    }
});

export default AddCard;