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
  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Card({navigation}: {navigation: any}) {

    const isFocused = useIsFocused();

    const DATA = [
        {
            id: 1,
            cType: 'VISA',
            cNum: '7489745123345671'
        },
        {
            id: 2,
            cType: 'Master Card',
            cNum: '4671894653412389'
        }
    ]

    useEffect(() => {

        
     }, [isFocused]);

    return(
            <SafeAreaView style={{flex: 1}}>

                <View style={styles.container}>
                    <View style={styles.headSection}>
                        <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                        <Text style={{fontSize: 17, color: "white"}}>Card</Text>
                    </View>

                    <TouchableOpacity style={{backgroundColor: '#0FE38A', borderRadius: 5, padding: 10, marginTop: 20, width: '100%'}} onPress={() => navigation.navigate('AddCard')} >
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 17, fontWeight: '500'}}>Add</Text>
                    </TouchableOpacity>

                    <View style={{marginTop: 20}}>
                        <FlatList
                            data={DATA}
                            renderItem={({item}) => 
                                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                                    
                                    <Text style={[styles.cardText, {textAlign: 'left'}]}><FontAwesome name={item.cType == 'VISA' ? 'cc-visa' : 'cc-mastercard'} color="white" size={20}/> {item.cType}</Text> 
                                    <Text style={[styles.cardText, {textAlign: 'right'}]}>{item.cNum.replace(/\d(?=\d{4})/g, "*")}</Text> 
                                </View>
                            }
                            
                        >

                        </FlatList>
                    </View>

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

    cardText: {
        width: '33%',
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        paddingTop: 15,
    },

})

export default Card;