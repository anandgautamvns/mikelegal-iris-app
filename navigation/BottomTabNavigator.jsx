import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import TabBarIcon from '../components/TabBarIcon';
import Search from '../screens/Search';
import Manager from '../screens/Manager';
import Hearing from '../screens/Hearing';
import Profile from '../screens/Profile';
import SearchScreen from '../screens/SearchScreen';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Manager';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ 
    headerTitle: getHeaderTitle(route),
    headerRight: () => (
      <Button
        title="Mikelegal"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    ),
  });
  console.log('navigation', navigation);
  console.log('setOptions', navigation.setOptions());
  console.log('route', route);

  return (
    <BottomTab.Navigator 
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName;

      //     if (route.name === 'Home') {
      //       iconName = focused
      //         ? 'ios-information-circle'
      //         : 'ios-information-circle-outline';
      //     } else if (route.name === 'Settings') {
      //       iconName = focused ? 'ios-list-box' : 'ios-list';
      //     }

      //     // You can return any component that you like here!
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      // })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
      <BottomTab.Screen
        name="hearing"
        component={Hearing}
        options={{
          title: 'Hearing',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  console.log('route', route);
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  console.log('routeName', routeName);
  switch (routeName) {
    case 'Profile':
      return 'Profile';
    case 'Search':
      return 'Search';
    case 'Manager':
      return 'Manager';
    case 'Hearing':
      return 'Hearing';
  }
}
