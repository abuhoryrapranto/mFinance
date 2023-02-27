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

function Map({route, navigation} : any) {

    const { title, description, geoCode } = route.params;

    return(
            <View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 52.489471,
                    longitude: -1.898575,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                >
                    <View style={styles.headSection}>
                        <MaterialIcons name="arrow-back-ios" color="black" size={20} onPress={() => navigation.goBack()} />
                        <Text style={{fontSize: 17, color: "black"}}>Map</Text>
                    </View>

                    <Marker coordinate = {{latitude: geoCode.latitude,longitude: geoCode.longitude}}
                        pinColor = {"red"}
                        title={title}
                        description={description}
                    />
                </MapView>
            </View>
    );
}

const styles = StyleSheet.create({

    container: {
        
        
    },

    headSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingLeft: 10,

    },

    map: {
        ...StyleSheet.absoluteFillObject,
        height: deviceHeight,
        width: 420,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
})

export default Map;