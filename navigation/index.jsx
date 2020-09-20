import React from 'react';
import { Platform, StatusBar, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Axios from 'axios';
import { ROOT_URL } from '../config';
import LinkingConfiguration from './LinkingConfiguration';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigation';
import {AuthContext} from '../screens/Context';
import { Splash } from '../screens/Layout';

const RootStack = createDrawerNavigator();
const RootStackScreen =({state})=> (
    <RootStack.Navigator headerMode="none">
        {state.isLoading ? (
            <RootStack.Screen name="splash" component={Splash} />
            ) : state.userToken == null ? (
            <RootStack.Screen 
                name="auth" 
                component={AuthNavigator}
                options={{
                animationEnabled: false
                }}
            />
            ) : (
            <RootStack.Screen 
                name="mikelegal" 
                component={DrawerNavigator} 
                options={{
                animationEnabled: false
                }}
            />
        )
    }
    </RootStack.Navigator>
)

export default function Navigation({ navigation }) {
    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                return {
                    ...state,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'SIGN_IN':
                return {
                    ...state,
                    isSignout: false,
                    userToken: action.token,
                };
            case 'SIGN_OUT':
                return {
                    ...state,
                    isSignout: true,
                    userToken: null,
                };
        }
    },
    {
        isLoading: true,
        isSignout: false,
        userToken: null,
    });

    React.useEffect(() => {
        const bootstrapAsync = async () => {
        let userToken;
        try {
            userToken = await AsyncStorage.getItem('token');
            console.log('userToken', userToken);
        } catch (error) {
            alert(error)
        }
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(() => ({
        signIn: async ({ username, password }) => {
            dispatch({ type: 'SIGN_IN' });
            try {
                const response = await Axios.post(`${ROOT_URL}/login/`,
                    { 
                        username: username, 
                        password: password, 
                        product: "iris" 
                    }
                )
                await AsyncStorage.setItem('token', response.data.token);
                dispatch({ 
                    type: 'SIGN_IN', 
                    token: response.data.token
                });
            }
            catch (error) {
            alert(error)
                dispatch({ type: 'SIGN_IN' });
            }
        },
        signOut: () => {
            AsyncStorage.removeItem('token');
            AsyncStorage.clear()
            dispatch({ type: 'SIGN_OUT' })
        },
    }), []);

    return (
        <AuthContext.Provider value={authContext}>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <NavigationContainer linking={LinkingConfiguration}>
                <RootStackScreen state={state}/>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});