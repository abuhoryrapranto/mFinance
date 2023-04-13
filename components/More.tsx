import React, { useState } from 'react';  
import {
    SafeAreaView,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    View,
  } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

function More({navigation}: {navigation: any}) {

    const [deviceId, setDeviceId] = useState('');
    const [loading, setLoading] = useState(false);

    const backup = async () => {
        
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setDeviceId(uniqueId);
        });

        const value = await AsyncStorage.getItem('@incExp');

        if(value) {
            let data = JSON.parse(value);

            if(data.length > 0) {

                setLoading(true)

                let finalData = data.map((item : any) => ({...item, deviceId: deviceId}));
                const save = {
                    data: finalData
                }
    
                await fetch('https://mfinance-backend.onrender.com/backup/save', {
                method: "POST",
                body: JSON.stringify(save),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
                })
                .then(res => {
                    if(res.status == 201) {

                        setLoading(false);

                        Alert.alert('Backup saved successfully.', '', [
                        
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ]);
                    }
                    
                    
                })
                .catch(err => console.error(err));
                
            } else {

                Alert.alert("You don't have enough data for backup!", '', [
                    
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
            }
                
        } else {

            Alert.alert("You don't have enough data for backup!", '', [
                    
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
    }

    const load = async() => {

        const data = await AsyncStorage.getItem('@incExp');

        if(data) {

            Alert.alert('You already have data', 'You can not load data', [
                    
                {text: 'OK', onPress:() => console.log("Ok.")},
            ]);

        } else {
            
            Alert.alert('Are you sure load backup data?','', [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                    
                {text: 'OK', onPress: async() => {

                    setLoading(true);

                    DeviceInfo.getUniqueId().then((uniqueId) => {
                        setDeviceId(uniqueId);
                    });

                    try {
                        const response = await fetch(
                          `https://mfinance-backend.onrender.com/backup?deviceId=${deviceId}`,
                        );

                        if(response.status == 200) {

                            const data = await response.json();

                            const save  = await AsyncStorage.setItem('@incExp', JSON.stringify(data.data));

                            setLoading(false);
                            
                        } else {

                            setLoading(false)

                            Alert.alert("You don't have any backup data.", '', [
                    
                                {text: 'OK', onPress:() => console.log("Ok.")},
                            ]);

                        }

                      } catch (error) {
              
                        console.error(error);
                      }

                }},
            ]);
        }  
    }

    return(
        <SafeAreaView>
            <View style={styles.container}>
            <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>More</Text>
            <View style={styles.section1}>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Atm')}>
                            <MaterialIcons name="atm" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>ATM</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Stock')}>
                            <FontAwesome5 name="chart-line" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Stocks</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Card')}>
                            <FontAwesome5 name="credit-card" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Card</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
                            <MaterialIcons name="feedback" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Feedback</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={backup}>
                            <MaterialIcons name="settings-backup-restore" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Backup</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={load}>
                            <MaterialIcons name="cloud-upload" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Load</Text>
                        </TouchableOpacity>
                    </View>
                  </View>

                  {
                    loading == true ? 
                        <View style={{marginTop: 50, justifyContent: 'center', alignItems: "center"}}>
                            <ActivityIndicator size="large" color="#00ff00" />
                            <Text style={{color: "white", fontSize: 15}}>Loading</Text>
                        </View>
                        :
                        ""
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

    section1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "flex-start",
    },
    
    section1_1: {
        width: '25%',
        alignItems: 'center',
        paddingTop: 20,
    },
})

export default More;