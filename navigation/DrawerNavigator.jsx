import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';

import Profile from '../screens/Profile';

import { AuthContext } from '../screens/Context';

const Drawer = createDrawerNavigator();

const INITIAL_ROUTE_NAME = 'Profile';


function CustomDrawerContent(props) {
    const { signOut } = React.useContext(AuthContext)
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
            label="Close drawer"
            onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        />
        <DrawerItem
            label="Toggle drawer"
            onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        />
        <DrawerItem
            label="Log Out"
            onPress={signOut}
        />
      </DrawerContentScrollView>
    );
}

export default function DrawerNavigator() {
    const dimensions = Dimensions.get('window');
    const isLargeScreen = dimensions.width >= 768;
    return (
        <Drawer.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            openByDefault
            drawerType={isLargeScreen ? 'slide' : 'front'}
            drawerStyle={
                isLargeScreen ? null 
                : { 
                    backgroundColor: '#c6cbef',
                    width: '70%' 
                }
            }
            overlayColor="transparent"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                // itemStyle: { marginVertical: 30 },
            }}
        >
            <Drawer.Screen name="Search" component={BottomTabNavigator}/>
            <Drawer.Screen name="Profile" component={Profile}/>
        </Drawer.Navigator>
    );
}
