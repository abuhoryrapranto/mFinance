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
  } from 'react-native';

import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

function Budget({navigation}: {navigation: any}) {

    let [budget, setBudget] = useState<Float>(0);

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headSection}>
                    <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                    <Text style={{fontSize: 17, color: "white"}}>Budget</Text>
                </View>
                
                <Text style={{color: 'white', fontSize: 17, fontWeight: '700', marginTop: 20}}>Your current month budget is: {budget.toFixed(2)} £</Text>

                
                <Text style={{color: 'white', fontSize: 15, marginTop: 20}}>Manually Select Budget (Monthly)</Text>

                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput style={styles.input} keyboardType='numeric'></TextInput>
                </View>

                <View>
                    <TouchableOpacity style={styles.saveBtn}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.predictBtn}>
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

    saveBtn: {
        borderColor: '#0FE38A',
        borderRadius: 5,
        backgroundColor: '#0FE38A',
        marginTop: 30,
        padding: 13,
        alignItems: 'center',
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