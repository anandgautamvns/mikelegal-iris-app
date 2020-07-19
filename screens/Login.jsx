import { Ionicons, AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, TextInput, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { signIn } from '../redux/actions/signIn';
import { LOADING, SUCCESS, ERROR } from '../constants/GeneralConstants';
import { AuthContext } from './Context'

// const { signIn } = React.useContext(AuthContext);
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
    }
    
    onHandleChange(userVariable, value) {
        this.setState({
            user: {
                ...this.state.user,
                [userVariable]: value
            }
        })
    }

    async onHandleSubmit() {
        const { username, password } = this.state.user;
        await this.props.signIn(this.state.user)
        this.props.navigation.navigate('Profile')
    }

    render() {
        const { username, password } = this.state;
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <TextInput
                    inlineImageLeft=""
                    style={styles.textInput}
                    keyboardAppearance="dark"
                    keyboardType="default"
                    placeholder="Username"
                    onChangeText={(value) => this.onHandleChange('username', value)}
                    value={username}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    keyboardAppearance="dark"
                    keyboardType="default"
                    placeholder="Password"
                    onChangeText={(value) => this.onHandleChange('password', value)}
                    value={password}
                />
                <Button
                    title="Log In"
                    color="#4d3d89"
                    disabled={this.props.logInStatus === LOADING}
                    onPress={()=> this.onHandleSubmit()}
                    style={styles.loginButton}
                />
            </ScrollView>
        );
    }
}

const mapDispatchToProps = {
    signIn
};

const mapStateToProps = (state) => {
    const { authenticate, logInStatus } = state.signIn;
    return { authenticate, logInStatus }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4285f4',
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
