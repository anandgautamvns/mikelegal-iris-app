import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

import Search from '../screens/Search';
import Watch from '../screens/Watch';
import Manager from '../screens/Manager';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
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
      </DrawerContentScrollView>
    );
}

export default function SideBarDrawer() {
    const dimensions = Dimensions.get('window');
    const isLargeScreen = dimensions.width >= 768;
    return (
        <Drawer.Navigator
            openByDefault
            drawerType={isLargeScreen ? 'slide' : 'front'}
            drawerStyle={
                isLargeScreen ? null 
                : { 
                    backgroundColor: '#c6cbef',
                    width: '100%' 
                }
            }
            overlayColor="transparent"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                // itemStyle: { marginVertical: 30 },
            }}
        >
            <Drawer.Screen name="Search" component={Search} />
            <Drawer.Screen name="Watch" component={Watch} />
            <Drawer.Screen name="Manager" component={Manager} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}

