import 'react-native-gesture-handler';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import File from './File';
import Proprietor from './Proprietor';
import Search from './Search';

const Tab = createMaterialTopTabNavigator();

export default function SearchScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
                activeTintColor: '#4285f4',
                inactiveTintColor: '#000',
                style: {
                    backgroundColor: '#e7e7e7',
                },
                labelStyle: {
                    textAlign: 'center',
                },
                indicatorStyle: {
                    borderBottomColor: '#4285f4',
                    borderBottomWidth: 2,
                },
            }}>
            <Tab.Screen
                name="Search-File"
                component={File}
                options={{
                    tabBarLabel: 'File',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
                }} 
            />
            <Tab.Screen
                name="Search-Proprietor"
                component={Proprietor}
                options={{
                    tabBarLabel: 'Proprietor',
                    // tabBarIcon: ({ color, size }) => (
                    //   <MaterialCommunityIcons name="settings" color={color} size={size} />
                    // ),
                }}
            />
            <Tab.Screen
                name="Search-Search"
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    // tabBarIcon: ({ color, size }) => (
                    //   <MaterialCommunityIcons name="settings" color={color} size={size} />
                    // ),
                }}
            />
        </Tab.Navigator>
    );
}