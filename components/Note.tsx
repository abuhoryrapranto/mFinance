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

function Note({navigation}: {navigation: any}) {

    const [note, setNote] = useState('');
    const [myNote, setMyNote] = useState<any[]>([]);

    const isFocused = useIsFocused();

    const saveNote = async () => {

        let noteData : any = {
            id: uuid.v4(),
            note: note
        }

        try {

            const notes = await AsyncStorage.getItem('@note');

            if(notes !== null) {

                let parseNote = JSON.parse(notes);
                parseNote.push(noteData);

                await AsyncStorage.setItem('@note', JSON.stringify(parseNote));
                setNote('');
                getNotes();

            } else {

                await AsyncStorage.setItem('@note', JSON.stringify([noteData]));
                setNote('');
                getNotes();
            }

            console.log('success');

        } catch(e) {

            console.log(e);
        }
    }

    const getNotes = async () => {

        try {

            const notesData = await AsyncStorage.getItem('@note');

            if(notesData !== null) {
                
                const parseData = JSON.parse(notesData);
                setMyNote(parseData);
                console.log(myNote);

            } else {

                console.log("No data found!");
            }

        } catch(e) {

            console.log(e);
        }
    }

    const deleteNote = async (uuid : any) => {

        const newMyNote = myNote.filter((item, index) => item.id != uuid);
        
        await AsyncStorage.setItem('@note', JSON.stringify(newMyNote));

        getNotes();

      }

    useEffect(() => {

        getNotes();
        
     }, [isFocused]);

    return(
            <SafeAreaView style={{flex: 1}}>

                <View style={styles.container}>
                    <View style={styles.headSection}>
                        <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                        <Text style={{fontSize: 17, color: "white"}}>Notes</Text>
                    </View>

                    <View style={{marginTop: 1}}>
                        <FlatList
                        data={myNote}
                        renderItem={({item} : any) => 
                            <View style={{flexDirection: 'row',  paddingTop: 15}}>
                                <FontAwesome name="dot-circle-o" color="white" size={15} />
                                <Text style={{color: 'white', fontSize: 16, paddingLeft: 5}}>{item.note}</Text>
                                <TouchableOpacity style={{flex: 1}} onPress={() => deleteNote(item.id)}>
                                    <Text style={{textAlign: 'right', color: '#FD6868', fontSize: 16}}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        >

                        </FlatList>
                    </View>


                    <View style={{flex:1, position: 'absolute', bottom: 30, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                        <TextInput style={styles.input} value={note} onChangeText={newNote => setNote(newNote)} placeholder="What's your plan for today?" placeholderTextColor="white"></TextInput>
                        <TouchableOpacity style={{backgroundColor: '#0FE38A', borderRadius: 5, padding: 10, marginTop: 10, width: '100%'}} onPress={saveNote}>
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

export default Note;