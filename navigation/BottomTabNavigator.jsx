import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import TabBarIcon from '../components/TabBarIcon';
import Search from '../screens/Search';
import Manager from '../screens/Manager';
import Profile from '../screens/Profile';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Search';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ 
    headerTitle: getHeaderTitle(route),
    // headerRight: () => (
    //   <Button
    //     title="Mikelegal"
    //     onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    //   />
    // ),
  });

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
      <BottomTab.Screen
        name="Manager"
        component={Manager}
        options={{
          title: 'Manager',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-manager" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Profile':
      return 'Profile';
    case 'Search':
      return 'Search';
    case 'Manager':
      return 'Manager';
  }
}
