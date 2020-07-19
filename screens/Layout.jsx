import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScreenContainer } from 'react-native-screens';
import { AuthContext } from './Context';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
});

export const Splash = () => {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Loading...</Text>
        </ScreenContainer>
    )
}

export const SignIn = ({ navigation }) => {
    const { SignIn } = React.useContext(AuthContext)
    return (
        <ScreenContainer style={styles.container}>
            <Text>Sign In</Text>
            <Button title="SignIn" onPress={() => SignIn()}/>
            <Button title="CreateAccount" onPress={() => navigation.push('CreateAccount')}/>
        </ScreenContainer>
    )
}

export const CreateAccount = ({ navigation }) => {
    const { SignUp } = React.useContext(AuthContext)
    return (
        <ScreenContainer style={styles.container}>
            <Text>Create Account</Text>
            <Button title="SignUp" onPress={() => SignUp()}/>
        </ScreenContainer>
    )
}

export const Profile = ({ navigation }) => {
    const { SignOut } = React.useContext(AuthContext)
    return (
        <ScreenContainer style={styles.container}>
            <Text>Profile</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')}/>
            <Button 
                title="Drawer" 
                onPress={() => navigation.toggleDrawer()}
            />
            <Button title="SignOut" onPress={() => SignOut()}/>
        </ScreenContainer>
    )
}

export const Home = ({ navigation }) => {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Home</Text>
            <Button 
                title="React Native by example" 
                onPress={() => navigation.push('Details', {
                    name: 'React Native by example'
                })}
            />
            <Button 
                title="React Native by school" 
                onPress={() => navigation.push('Details', {
                    name: 'React Native by school'
                })}
            />
            <Button 
                title="Drawer" 
                onPress={() => navigation.toggleDrawer()}
            />
        </ScreenContainer>
    )
}

export const Details = ({ route, navigation }) => {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Details</Text>
            {route.params.name && <Text>{route.params.name}</Text>}
        </ScreenContainer>
    )
}

export const Search = ({ navigation }) => {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Search</Text>
            <Button 
                title="Search2" 
                onPress={() => navigation.push('Search2')}
            />
            <Button 
                title="React Native School" 
                onPress={() => navigation.navigate('Home', 
                    {
                        screens: 'Details',
                        params: {name: 'React Native School'}
                    }
                )}
            />
        </ScreenContainer>
    )
}

export const Search2 = ({ navigation }) => {
    return (
        <ScreenContainer style={styles.container}>
            <Text>Search2</Text>
            <Button title="Search" onPress={() => navigation.push('Search')}></Button>
            <Button title="Home" onPress={() => navigation.navigate('Home')}></Button>
        </ScreenContainer>
    )
}
