import * as React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View, AppRegistry, AsyncStorage } from 'react-native';
import Axios from "axios";
import { ROOT_URL } from './config';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import store from './redux/store';
import { name as appName } from './app.json';
import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import DrawerNavigator from './navigation/DrawerNavigator';
import AuthNavigator from './navigation/AuthNavigation';
import { Splash } from './screens/Layout';

import {AuthContext} from './screens/Context';

const RootStack = createDrawerNavigator();
const RootStackScreen =({state})=> (
  <RootStack.Navigator headerMode="none">
    {state.isLoading ? (
      <RootStack.Screen  name="Splash" component={Splash} />
    ) : state.userToken == null ? (
      <RootStack.Screen 
        name="Auth" 
        component={AuthNavigator}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen 
        name="App" 
        component={DrawerNavigator} 
        options={{
          animationEnabled: false
        }}
      />
    )
  }
  </RootStack.Navigator>
)


export default function App({ navigation }) {
  const isLoadingComplete = useCachedResources(); 

  const [state, dispatch] = React.useReducer(
    (state, action) => {
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
    }
  );

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

  
  const authContext = React.useMemo(
    () => ({
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
    }),
    []
  );
  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <RootStackScreen state={state}/>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

AppRegistry.registerComponent('appName', () => App)