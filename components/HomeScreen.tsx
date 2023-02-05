import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
function HomeScreen() {
    return (
        <SafeAreaView style={styles.backGround}>
          <Text>Home!</Text>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: "#333333"
  }
});

export default HomeScreen;