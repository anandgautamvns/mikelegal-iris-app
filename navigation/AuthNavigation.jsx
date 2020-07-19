import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import Login from '../screens/Login';
import SignInScreen from '../screens/SignIn';


const AuthStack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={SignInScreen} options={{title: "Login"}}/>
        </AuthStack.Navigator>
    )
}
