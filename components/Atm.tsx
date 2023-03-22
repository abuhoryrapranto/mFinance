import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    FlatList,
  } from 'react-native';

import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Atm({navigation}: {navigation: any}) {

    const [atm, setAtm] = useState<any[]>([]);

      const getAllAtms = async () => {
        try {
          const response = await fetch(
            'https://mfinance-backend.onrender.com/atm',
          );
          const data = await response.json();

          setAtm(data.data);

        } catch (error) {

          console.error(error);
        }
      };

      useEffect(() => {

        getAllAtms();
        
     }, []);

      const Item = ({bankName, streetName, city, postCode, geoCode} : any) => (
        <View style={styles.section1}>
            <View  style={styles.section1_1}>
                <Text style={{color: '#0FE38A', fontSize: 16, fontWeight: '500'}}>{bankName}</Text>
                <Text style={{color: 'white', paddingTop: 5}}>{streetName}, {city}, {postCode}</Text>
            </View>
          
          <View style={styles.section1_2}>
            
            <TouchableOpacity style={styles.mapBtn} onPress={() => navigation.navigate('Map', {title: bankName, description: streetName, geoCode: geoCode})}>
                <Text style={{color: 'white', fontWeight: '500'}}>Map View</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      );

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headSection}>
                    <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                    <Text style={{fontSize: 17, color: "white"}}>ATM</Text>
                </View>

                <View>
                    <FlatList
                    data={atm}
                    renderItem={({item}) => <Item bankName={item.bank.name} streetName={item.address.streetName} city={item.address.city} postCode={item.address.postCode} geoCode={item.address.geoLocation} />}
                    keyExtractor={item => item._id}
                    >

                    </FlatList>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        // marginLeft: 10,
        // marginRight: 10
    },

    headSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },

    section1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    
    section1_1: {
        width: '70%',
        paddingTop: 20,
        padding: 10,
    },

    section1_2: {
        width: '30%',
        justifyContent: 'center',
        padding: 10,
    },

    mapBtn: {
        borderColor: '#FD6868',
        borderRadius: 5,
        backgroundColor: '#FD6868',
        padding: 10,
        alignItems: 'center',
    },
})

export default Atm;