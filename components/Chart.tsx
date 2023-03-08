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

function Chart({navigation}: {navigation: any}) {

    const isFocused = useIsFocused();

    useEffect(() => {
        
     }, [isFocused]);

    return(
            <SafeAreaView style={{flex: 1}}>

                <View style={styles.container}>
                    <View style={styles.headSection}>
                        <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                        <Text style={{fontSize: 17, color: "white"}}>Chart</Text>
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
    },

})

export default Chart;