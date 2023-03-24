import React, { useState, useEffect } from 'react';  
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { BarChart, PieChart } from "react-native-chart-kit";
import moment from 'moment';
const _ = require('lodash');

function Chart({navigation}: {navigation: any}) {

    const isFocused = useIsFocused();

    let [expenses, setExpenses] = useState<any[]>([]);
    let [months, setMonths] = useState<any[]>([]);
    let [pieData, setPieData] = useState<any[]>([]);

    const monthlyExpense = async() => {

        try {

                const value = await AsyncStorage.getItem('@incExp');

                let mnt : Array<any> = [];
                let exp : Array<any> = [];
                let pie : Array<any> = [];

                if(value !== null) {

                    const data : Array<any> = JSON.parse(value);
                    const filterData = data.filter(item => item.type == 'Expense');
                    const groupedData = _(filterData).groupBy( ({date} : any) => new Date(date).getMonth())
                                        .map((item : any, key : any) => {
                                            mnt.push(moment.monthsShort(Number(key)))
                                            exp.push(_.sumBy(item, (value : any) => Number(value.amount)))
                                            
                                        })
                                        .value();

                    const pieData = data.filter(item  => new Date(item.date).getMonth() == new Date().getMonth() && new Date(item.date).getFullYear() == new Date().getFullYear())
                    const groupPieData = _(pieData).groupBy('type')
                                        .map((item : any, key : any) => {
                                            
                                            let data = {
                                                name: key,
                                                population: _.sumBy(item, (value : any) => Number(value.amount)),
                                                color: key == 'Income' ? '#0FE38A' : '#FD6868',
                                                legendFontColor: "#7F7F7F",
                                                legendFontSize: 15
                                            }

                                            pie.push(data);
                                            
                                        })
                                        .value();
                    setMonths(mnt);
                    setExpenses(exp);
                    setPieData(pie);
                }

            } catch(e) {

                console.log(e);
            }

    }

    useEffect(() => {

        monthlyExpense()
        
     }, [isFocused]);

    return(
            <SafeAreaView style={{flex: 1}}>

                <View style={styles.container}>
                    <View style={styles.headSection}>
                        <MaterialIcons name="arrow-back-ios" color="white" size={20} onPress={() => navigation.goBack()} />
                        <Text style={{fontSize: 17, color: "white"}}>Chart</Text>
                    </View>
                </View>

                <View style={{marginTop: 20}}>

                    <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>Monthly Expense</Text>

                    <BarChart
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                        data={
                            {
                                labels: months,
                                datasets: [
                                    {
                                    data: expenses
                                    }
                                ]
                            }
                        }
                        width={Dimensions.get("window").width/1.05}
                        height={220}
                        yAxisLabel="£"
                        yAxisSuffix=""
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                            }}
                        verticalLabelRotation={30}
                    />
                </View>

                <View style={{marginTop: 30}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>Income & Expense ({moment().format('MMMM')})</Text>
                    <PieChart
                    data={pieData}
                    width={Dimensions.get("window").width}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"0"}
                    />
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

})

export default Chart;