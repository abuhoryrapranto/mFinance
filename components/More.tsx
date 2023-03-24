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

function More({navigation}: {navigation: any}) {
    return(
        <SafeAreaView>
            <View style={styles.container}>
            <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>More</Text>
            <View style={styles.section1}>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Atm')}>
                            <MaterialIcons name="atm" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>ATM</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Stock')}>
                            <FontAwesome5 name="chart-line" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Stocks</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Card')}>
                            <FontAwesome5 name="credit-card" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Card</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
                            <MaterialIcons name="feedback" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Feedback</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section1_1}>
                        <TouchableOpacity>
                            <MaterialIcons name="settings-backup-restore" color='white' size={50} />
                            <Text style={{color: 'white', textAlign: 'center'}}>Backup</Text>
                        </TouchableOpacity>
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
        marginTop: 5,
    },

    section1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
    },
    
    section1_1: {
        width: '25%',
        alignItems: 'center',
        paddingTop: 20,
    },
})

export default More;