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

function Stock({navigation}: {navigation: any}) {

    const [stock, setStock] = useState<any[]>([]);
    let [loading, setLoading] = useState(1);

      const getAllAtms = async () => {
        try {
          const response = await fetch(
            'https://latest-stock-price.p.rapidapi.com/any', {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '2193286898msh3f86ea428518736p1f59c8jsn238f69703594',
                    'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
                }
            }
          );
          const data = await response.json();

          setStock(data);

          setLoading(0);

        } catch (error) {

          console.error(error);
        }
      };

      useEffect(() => {

        getAllAtms();
        
     }, []);


    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headSection}>
                    <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                    <Text style={{fontSize: 17, color: "white"}}>Stock</Text>
                </View>

                
                    <View style={styles.section1}>
                        <Text style={styles.section1_1}>Symbol</Text>
                        <Text style={styles.section1_1}>Last Price</Text>
                        <Text style={styles.section1_1}>Change</Text>
                        <Text style={styles.section1_1}>% Change</Text>
                    </View>
                    <ScrollView>

                        {
                            loading === 0 ? 
                            stock.length > 0 ?
                            <>
                            {
                                stock.map(item => (
                                    <View style={styles.section2} key={item.identifier}>
                                        <Text style={styles.section2_1}>{item.symbol}</Text>
                                        <Text style={styles.section2_1}>{item.lastPrice.toFixed(2)}</Text>
                                        <Text style={[styles.section2_1, {color: item.change < 0 ? '#FD6868' : '#0FE38A'}]}>{item.change.toFixed(2)}</Text>
                                        <Text style={[styles.section2_1, {color: item.pChange < 0 ? '#FD6868' : '#0FE38A'}]}>{item.pChange}</Text>
                                    </View>
                                ))
                            }
                            </> :
                            <Text>No Data Found!</Text>

                            :   <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                                    <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>Loading...</Text>
                                </View>
                        }
                        
                    </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        
    },

    headSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },

    section1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        marginTop: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1, 
        borderBottomColor: 'white',
        borderTopColor: 'white',
    },
    
    section1_1: {
        width: '23%',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10
    },

    section2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        // marginTop: 20,
    },
    
    section2_1: {
        width: '23%',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10
    },
    
})

export default Stock;