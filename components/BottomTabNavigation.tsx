import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../components/HomeScreen';
import Budget from './Budget';
import More from './More';
import Chart from './Chart';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
    return(
        <Tab.Navigator 
            
            screenOptions={{
                headerShown: false,
                tabBarStyle:{
                backgroundColor: "#333333",
                height: 60,
                paddingBottom: 5,
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
                    },
                    unmountOnBlur: true
                })
                }
                />
                <Tab.Screen name="Budget" component={Budget}
                
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
                <Tab.Screen name="Chart" component={Chart} 
                
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
                <Tab.Screen name="More" component={More} 
                
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
    );
}

export default BottomTabNavigation;