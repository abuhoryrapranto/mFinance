import React, { useState, useEffect } from 'react';  
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
    Alert,
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

    //This function used for save notes in async storage.
    const saveNote = async () => {

        if(note == '') {
            Alert.alert('Note field is empty', 'Please put some notes here', [
                
                {text: 'OK', onPress: () => console.log("Ok.")},
            ]);
            
        } else {

            const notes = await AsyncStorage.getItem('@note');

        let noteData : any = {
            id: uuid.v4(),
            note: note,
            completed: false,
            count: notes ? JSON.parse(notes).length+1 : 1
        }

        try {

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

            console.log("success");

        } catch(e) {

            console.log(e);
        }

        }
    }

    //This function used for fetch notes from async storage.
    const getNotes = async () => {

        try {

            const notesData = await AsyncStorage.getItem('@note');

            if(notesData !== null) {
                
                const parseData = JSON.parse(notesData);
                setMyNote(parseData.sort((a : any, b : any) => b.count - a.count));
                console.log(myNote);

            } else {

                console.log("No data found!");
            }

        } catch(e) {

            console.log(e);
        }
    }

    //This function used for complete the note
    const done = async(item : any) => {

        const notes = await AsyncStorage.getItem('@note');
            let data : Array<any> = [];

            if(notes) {
                data = JSON.parse(notes);
            }
            const newNote = data.filter((data, index) => data.id != item.id);

            let addItem : any = {
                id: uuid.v4(),
                note: item.note,
                completed: item.completed == true ? false : true,
                count: item.count,
            }
    
            try {

                newNote.push(addItem);
                await AsyncStorage.setItem('@note', JSON.stringify(newNote));
                getNotes();

            } catch(e) {
    
                console.log(e);
            }
    } 

    //This function used for delete note from async storage.
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
                    <TouchableOpacity style={styles.headSection} onPress={() => navigation.goBack()} >
                        <MaterialIcons name="arrow-back-ios" color="white" size={20} />
                        <Text style={{fontSize: 17, color: "white"}}>Notes</Text>
                    </TouchableOpacity>

                    <View style={{marginTop: 1}}>
                        <FlatList
                        data={myNote}
                        renderItem={({item} : any) => 
                            <View style={{flexDirection: 'row', alignItems: "center", paddingTop: 15}}>

                                <FontAwesome name="dot-circle-o" color="white" style={{textAlign: 'left'}} size={15} />
  
                                <Text style={[item.completed == true ? { textDecorationLine: 'line-through'} : {}, {color: 'white', fontSize: 16, paddingLeft: 5, maxWidth: '80%'}]} onPress={() => done(item)}>{item.note}</Text>
                                
                                <TouchableOpacity style={{marginLeft: "auto"}} onPress={() => deleteNote(item.id)}>
                                    <Text style={{ color: '#FD6868', fontSize: 16}}>Delete</Text>
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