import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, TextInput, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';
import Loader from '../components/Loader';

import { getSubscriptionProfile } from '../redux/actions/signIn';
import { LOADING, SUCCESS, ERROR } from '../constants/GeneralConstants';

class WhatsNew extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    componentDidMount(){
        this.props.getSubscriptionProfile();
    }

    render() {
        const { subscriptionProfile, subscriptionQuota, subscriptionStatus } = this.props;
        return (
            <ScreenContainer style={styles.container}>
               <View>
                    <TextInput
                        inlineImageLeft=""
                        style={styles.textInput}
                        placeholder="Username"
                        // value={username}
                        // onChangeText={setUsername}
                    />
               </View>
            </ScreenContainer>            
        );
    }
}

const mapDispatchToProps = {
    getSubscriptionProfile
};

const mapStateToProps = (state) => {
    console.log('state', state);
    const { subscriptionProfile, subscriptionQuota, subscriptionStatus } = state.signIn;
    return { 
        subscriptionProfile, 
        subscriptionQuota,
        subscriptionStatus
    } 
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WhatsNew);