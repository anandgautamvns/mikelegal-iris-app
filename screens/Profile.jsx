import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, Image, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../components/Loader';

import { getSubscriptionProfile } from '../redux/actions/signIn';
import { LOADING, SUCCESS, ERROR } from '../constants/GeneralConstants';

class Profile extends Component {
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
            <ScrollView style={styles.container}>
                {subscriptionStatus === LOADING && 
                    <View>
                        <Loader/>
                    </View>
                }
                {subscriptionStatus === SUCCESS &&  
                    <View style={styles.cardContainer}>
                        <View style={styles.cardBodyContainer}>
                            <Image
                                source={{
                                    uri: subscriptionProfile.picture
                                }}
                                style={styles.loaderImage}
                            />
                        </View>
                        <View style={styles.cardBodyContainer}>
                            <Text style={styles.contentHeading}>Email:- </Text>
                            <Text style={styles.contentText}>{subscriptionProfile.email}</Text>
                        </View>
                        <View style={styles.cardBodyContainer}>
                            <Text style={styles.contentHeading}>User Name:- </Text>
                            <Text style={styles.contentText}>{subscriptionProfile.name}</Text>
                        </View>
                        <View style={styles.cardBodyContainer}>
                            <Text style={styles.contentHeading}>Total Quota:- </Text>
                            <Text style={styles.contentText}>{subscriptionQuota.total}</Text>
                            <Text style={styles.contentHeading}>Used Quota:- </Text>
                            <Text style={styles.contentText}>{subscriptionQuota.used}</Text>
                        </View>
                        <Button
                                title="Modal"
                                color="#4d3d89"
                                onPress={()=> this.setState({
                                    modalVisible: true
                                })}
                            />
                    </View>
                }
                {subscriptionStatus === ERROR && 
                    <View>
                        <Loader/>
                    </View>
                }
            </ScrollView>

            
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
        // backgroundColor: '#4285f4',
    },
    contentContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    cardContainer: {
        backgroundColor: '#fff',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    cardBodyContainer: {
        width:'100%',
        flexDirection: 'row'
    },
    loaderImage: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
    },
    contentHeading: {
        fontWeight: '600'
    },

    contentText: {
        fontWeight: '400'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);