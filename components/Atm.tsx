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
    TextInput,
    Alert,
  } from 'react-native';

import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Atm({navigation}: {navigation: any}) {

    const [atm, setAtm] = useState<any[]>([]);
    const [search, setSearch] = useState('');

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

      const searchAtm = () => {

        if(search.length > 0) {
          
          const keyWord = search.replace(/\s/g,'');

          const modifiedKeyWord = [keyWord.slice(0, 2), keyWord.replace(/\s/g,'').slice(2)].join(' ');

          let result = atm.filter(item => item.address.postCode.toUpperCase() == modifiedKeyWord.toUpperCase());

          if(result.length > 0) {

            setAtm(result);

          } else {

            Alert.alert('No ATM Found', 'Sorry!', [
                  
              {text: 'OK', onPress: getAllAtms},
            ]);

          }
          }
      }

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
                    {
                      atm.length > 0 ? 
                      <>

                    <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', padding: 10}}>
                      <TextInput style={styles.input} value={search} onChangeText={newNote => setSearch(newNote)} placeholder="Search (Ex: B8 1PE)" placeholderTextColor="white" onSubmitEditing={searchAtm}></TextInput>
                    </View>

                    <FlatList
                      data={atm}
                      renderItem={({item}) => <Item bankName={item.bank.name} streetName={item.address.streetName} city={item.address.city} postCode={item.address.postCode} geoCode={item.address.geoLocation} />}
                      keyExtractor={item => item._id}
                    >
  
                      </FlatList>
                      
                      </>
                       :

                      <Text style={{color: 'white', fontSize: 17, textAlign: 'center', marginTop: 20}}>Loading...</Text>
                    }
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

    input: {
      flex: 1,
      height: 35,
      borderWidth: 1,
      padding: 10,
      borderColor: 'white',
      borderRadius: 5,
      color: 'white',
  },
})

export default Atm;