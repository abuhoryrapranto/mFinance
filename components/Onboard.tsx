import React, { useState, useEffect, useRef } from 'react';  
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    Image,
    Dimensions,
    StatusBar,
  } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Onboard({navigation}: {navigation: any}) {

    const onboardingRef = useRef<Onboarding>(null);

    //This function works when users set onboarding done.
    const done = async () => {
        await AsyncStorage.setItem('@onboard', 'done');
        navigation.replace('Tabs');
    }

    return(
            <View style={styles.container}>
                <StatusBar backgroundColor="white"/>
                <Onboarding
                    ref={onboardingRef}
                    onSkip={done}
                    onDone={done}
                    pages={[
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.image} source={require('../assets/image-1.jpg')} />,
                            title: <Text style={{fontSize: 40, color: "#3F3B3B", fontWeight: 'bold'}}>Add your daily</Text>,
                            subtitle: 
                            <View>
                                <Text style={{fontSize: 30, color: "#3F3B3B", fontWeight: 'bold'}}>
                                    <Text style={{color: "#0FE38A"}}>Income</Text>
                                    <Text> & </Text>
                                    <Text style={{color: "#FD6868"}}>Expense</Text>
                                </Text>
                            </View>,
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.image} source={require('../assets/image-2.jpg')} />,
                            title: <Text style={{fontSize: 40, color: "#3F3B3B", fontWeight: 'bold'}}>Make budget with</Text>,
                            subtitle:<Text style={{fontSize: 35, color: "#0FE38A", fontWeight: 'bold'}}>AI</Text>,
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.image} source={require('../assets/image-3.jpg')} />,
                            title: <Text style={{fontSize: 40, color: "#3F3B3B", fontWeight: 'bold'}}>And do many</Text>,
                            subtitle:<Text style={{fontSize: 35, color: "#0FE38A", fontWeight: 'bold'}}>MORE</Text>,
                        },
                    ]}
                />

            </View>
        
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    image: {
        height: Dimensions.get('window').width/1.5, 
        width: Dimensions.get('window').width
        
    }

})

export default Onboard;