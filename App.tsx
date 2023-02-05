/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './components/HomeScreen'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App(): JSX.Element {

  return (
   
    <NavigationContainer>
      <Tab.Navigator 
      
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          backgroundColor: "#333333",
        },
        }}
        
        >
        <Tab.Screen name="Home" component={HomeScreen} 

          options={({route}) => ({

            tabBarIcon: ({ focused }) => {

              let iconColor;

              if(route.name == "Home") {
                iconColor = focused ? "#0FE38A" : "white";
              }

              return <MaterialIcons name="dashboard-customize" color={iconColor} size={26} />
            },
            tabBarLabelStyle:{
              color: "white",
              fontSize: 12,
            }
          })
          }
        />
        <Tab.Screen name="Budget" component={SettingsScreen}
        
        options={({route}) => ({

          tabBarIcon: ({ focused }) => {

            let iconColor;

            if(route.name == "Budget") {
              iconColor = focused ? "#0FE38A" : "white";
            }

            return <MaterialIcons name="calendar-today" color={iconColor} size={26} />
          },
          tabBarLabelStyle:{
            color: "white",
            fontSize: 12,
          }
        })
        }
        
        />
        <Tab.Screen name="Chart" component={HomeScreen} 
        
        options={({route}) => ({

          tabBarIcon: ({ focused }) => {

            let iconColor;

            if(route.name == "Chart") {
              iconColor = focused ? "#0FE38A" : "white";
            }

            return <MaterialIcons name="pie-chart" color={iconColor} size={26} />
          },
          tabBarLabelStyle:{
            color: "white",
            fontSize: 12,
          }
        })
        }
        
        />
        <Tab.Screen name="More" component={SettingsScreen} 
        
        options={({route}) => ({

          tabBarIcon: ({ focused }) => {

            let iconColor;

            if(route.name == "More") {
              iconColor = focused ? "#0FE38A" : "white";
            }

            return <MaterialIcons name="more-vert" color={iconColor} size={26} />
          },
          tabBarLabelStyle:{
            color: "white",
            fontSize: 12,
          }
        })
        }
        
        />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: "#333333"
  }
});

export default App;
