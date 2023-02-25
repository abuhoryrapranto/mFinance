import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
  
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Note({navigation}: {navigation: any}) {
    return(
        <SafeAreaView>
            <View style={styles.container}>
            <View style={styles.section1}>
                    <View style={styles.section1_1}>
                        <MaterialIcons name="atm" color='white' size={50} />
                        <Text style={{color: 'white'}}>ATM</Text>
                    </View>
                    <View style={styles.section1_1}>
                        <FontAwesome5 name="chart-line" color='white' size={50} />
                        <Text style={{color: 'white'}}>Stocks</Text>
                    </View>
                    <View style={styles.section1_1}>
                        <FontAwesome5 name="credit-card" color='white' size={50} />
                        <Text style={{color: 'white'}}>Card</Text>
                    </View>
                    <View style={styles.section1_1}>
                        <MaterialIcons name="feedback" color='white' size={50} />
                        <Text style={{color: 'white'}}>Feedback</Text>
                    </View>
                    <View style={styles.section1_1}>
                        <MaterialIcons name="settings-backup-restore" color='white' size={50} />
                        <Text style={{color: 'white'}}>Feedback</Text>
                    </View>
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

    section1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        marginTop: 10,
    },
    
    section1_1: {
        width: '25%',
        alignItems: 'center',
        paddingTop: 30
    },
})

export default Note;