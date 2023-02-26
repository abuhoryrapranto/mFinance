import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    Dimensions,
  } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';

const deviceHeight = Dimensions.get("window").height

function Map({navigation}: {navigation: any}) {
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headSection}>
                    <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                    <Text style={{fontSize: 17, color: "white"}}>Map</Text>
                </View>

                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 52.489471,
                    longitude: -1.898575,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                >

                    <Marker coordinate = {{latitude: 52.47930326116376,longitude: -1.897928015467875}}
                        pinColor = {"red"} // any color
                        title={"title"}
                        description={"description"}
                    />
                </MapView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        
        ...StyleSheet.absoluteFillObject,
        height: deviceHeight,
        width: 420,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },

    headSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default Map;