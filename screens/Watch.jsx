// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import 'react-native-gesture-handler';

import * as React from 'react';
import { StyleSheet, Text, View, Platform, Image, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from './Profile';
import Search from './Search';

const Tab = createMaterialTopTabNavigator();

function Watch() {
  return (
    <View>
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
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            // ),
            // tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
          }} />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }} />
      </Tab.Navigator>
    </View>
  );
}

export default Watch;