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
    Alert,
  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';

function Feedback({navigation}: {navigation: any}) {

    const [feedback, setFeedback] = useState('');
    const [deviceId, setDeviceId] = useState('');


    const saveFeedback = async () => {

        DeviceInfo.getUniqueId().then((uniqueId) => {
            setDeviceId(uniqueId);
        });

        const data : any = {
            deviceId: deviceId,
            message : feedback
        }

        await fetch('https://mfinance-backend.onrender.com/feedback/save', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => {
            if(res.status == 201) {
                setFeedback('');
                Alert.alert('Feedback send successfully.', '', [
                
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
            }
            
            
        })
        .catch(err => console.error(err));
  
    }

    return(
            <SafeAreaView style={{flex: 1}}>

                <View style={styles.container}>
                    <View style={styles.headSection}>
                        <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                        <Text style={{fontSize: 17, color: "white"}}>Feedback</Text>
                    </View>


                    <View style={{width: '100%', marginTop: 20}}>
                        <TextInput style={styles.input} value={feedback} onChangeText={newNote => setFeedback(newNote)} placeholder="Write your experiences..." placeholderTextColor="white"></TextInput>
                        <TouchableOpacity style={{backgroundColor: '#0FE38A', borderRadius: 5, padding: 10, marginTop: 10, width: '100%'}} onPress={saveFeedback}>
                            <Text style={{color: 'white', textAlign: 'center', fontSize: 17, fontWeight: '500'}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({

    container: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
    },

    headSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
        paddingLeft: 10
    },

})

export default Feedback;