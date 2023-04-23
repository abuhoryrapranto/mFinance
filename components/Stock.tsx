import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
  } from 'react-native';

import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Stock({navigation}: {navigation: any}) {

    const [stock, setStock] = useState<any[]>([]);
    let [loading, setLoading] = useState(1);
    const [search, setSearch] = useState('');

      //This function helps for get all stocks data from third party api (Rapid Api)
      const getAllStocks = async () => {

        setLoading(1);

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

      //This api helps for search stocks data from api.
      const searchStocks = () => {

        if(search.length > 0) {

            const keyWord = search.replace(/\s/g,'');

            let result = stock.filter(item => item.symbol.replace(/\s/g,'').toUpperCase() == keyWord.toUpperCase());

            if(result.length > 0) {

            setStock(result);

            } else {

            Alert.alert('No Stocks Found', 'Sorry!', [
                    
                {text: 'OK', onPress: getAllStocks},
            ]);

            }

        }
      }

      useEffect(() => {

        getAllStocks();
        
     }, []);


    return(
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.headSection} onPress={() => navigation.goBack()} >
                    <MaterialIcons name="arrow-back-ios" color="white" size={20} />
                    <Text style={{fontSize: 17, color: "white"}}>Stock</Text>
                </TouchableOpacity>


                {
                    stock.length > 0 ?

                    <>

                    <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', padding: 10}}>
                        <TextInput style={styles.input} value={search} onChangeText={newNote => setSearch(newNote)} placeholder="Search (Ex: TRENT)" placeholderTextColor="white" onSubmitEditing={searchStocks}></TextInput>
                    </View>

                    <View style={styles.section1}>
                        <Text style={styles.section1_1}>Symbol</Text>
                        <Text style={styles.section1_1}>Last Price</Text>
                        <Text style={styles.section1_1}>Change</Text>
                        <Text style={styles.section1_1}>% Change</Text>
                    </View>
                    
                    </>

                    :
                    ""
                }
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
                            <Text style={{textAlign: 'center', marginTop: 20, color: "white", fontSize: 15}}>No Data Found!</Text>

                            :   <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                                    <ActivityIndicator size="large" color="#00ff00" />
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
        marginRight: 10,
        marginTop: 5,
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

    input: {
        flex: 1,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
    },
    
})

export default Stock;