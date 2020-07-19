import * as React from 'react';
import { StyleSheet, Text, View, Platform, TextInput, Button} from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { AuthContext } from './Context';

export default function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <ScreenContainer style={styles.container}>
        <TextInput
            inlineImageLeft=""
            style={styles.textInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <Button
            title="Log In"
            color="#4d3d89"
            style={styles.loginButton}
            // disabled={this.props.logInStatus === LOADING}
            onPress={() => signIn({ username, password })}
        />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4285f4',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    contentContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    textInput: {
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                width: '80%',
            },
            android: {
                width: '80%',
            },
            native: {
                width: '40%',
            },
            default: {
                width: '40%',
            }
        }),
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    loginButton: {
        ...Platform.select({
            ios: {
                width: '80%',
            },
            android: {
                width: '80%',
            },
            native: {
                width: '40%',
            },
            default: {
                width: '40%',
            }
        }),
        height: 40, 
        borderColor: '#4d3d89', 
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        margin: 10,
        padding: 10,
    },
    loginButtonText: {
        textAlign: 'center',
        color: '#fff'
    },
});