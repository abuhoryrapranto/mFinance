import React, { useState, useEffect, useRef } from 'react';  
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Animated,
  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from './Button';

function Card({navigation}: {navigation: any}) {

    const isFocused = useIsFocused();
    const swipeableRef = useRef<Swipeable[]>([]);

    const [card, setCard] = useState<any[]>([]);

    //This function used for get all atm cards from async storage
    const getCards = async () => {

        try {

            const cardData = await AsyncStorage.getItem('@card');

            if(cardData !== null) {
                
                const parseData = JSON.parse(cardData);
                setCard(parseData);

            } else {

                console.log("No data found!");
            }

        } catch(e) {

            console.log(e);
        }
    }

    const swipeRight = (progress : any, dragX : any, index: number, uuid : any) =>{
        const scale = dragX.interpolate({
          inputRange:[-200,0],
          outputRange:[1,0.5],
          extrapolate:'clamp'
        })
        return(
          <TouchableOpacity onPress={() => deleteCard(index, uuid)}>
            <Animated.View>
              <Animated.Text style={{marginLeft:'auto', fontSize:22, fontWeight:'bold', color:'#FD6868', transform:[{scale}], marginTop: 10}}>Delete</Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        )
      }
    
      //This funnction used for delete card from async storage
      const deleteCard = async (index : number, uuid : any) => {

        const newCard = card.filter((item, index) => item.id != uuid);
        
        await AsyncStorage.setItem('@card', JSON.stringify(newCard));
        swipeableRef.current?.[index].close();
        getCards();
        
      }

    useEffect(() => {

        getCards();

     }, [isFocused]);

    return(
            <SafeAreaView style={{flex: 1}}>

                <View style={styles.container}>
                    <TouchableOpacity style={styles.headSection} onPress={() => navigation.goBack()} >
                        <MaterialIcons name="arrow-back-ios" color="white" size={20} />
                        <Text style={{fontSize: 17, color: "white"}}>Card</Text>
                    </TouchableOpacity>

                    <Button name="Add" fontSize={18} fontWeight="700" marginTop={20} myFunc={() => navigation.navigate('AddCard')} />

                    <View style={{marginTop: 20}}>
                        <FlatList
                            data={card}
                            renderItem={({item, index}) => 
                                <Swipeable renderRightActions={(progress, dragX) => swipeRight(progress, dragX, index, item.id)} rightThreshold={-200} ref={(ref) => {if(ref) swipeableRef.current.push(ref)}}>
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                                        
                                        <Text style={[styles.cardText, {textAlign: 'left'}]}><FontAwesome name={item.cType == 'VISA' ? 'cc-visa' : 'cc-mastercard'} color="white" size={20}/> {item.cType}</Text> 
                                        <Text style={[styles.cardText, {textAlign: 'right'}]}>{item.cNum.replace(/\d(?=\d{4})/g, "*")}</Text> 
                                    </View>
                                </Swipeable>
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
        marginTop: 5,
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