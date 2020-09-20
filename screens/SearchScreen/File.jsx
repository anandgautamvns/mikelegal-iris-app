import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, TextInput, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';

import { signIn, queueReport, getUnavailableReports } from '../../redux/actions/signIn';
import { TM_SEARCH, FILE, SEARCH, PROPRIETOR, LOADING, SUCCESS, ERROR } from '../../constants/GeneralConstants';
import { standardizeDate } from '../../function';

class File extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        this.props.getUnavailableReports({ product_name: TM_SEARCH, search_report_type: SEARCH});
        this.props.getUnavailableReports({ product_name: TM_SEARCH, search_report_type: PROPRIETOR});
        this.props.getUnavailableReports({ product_name: TM_SEARCH, search_report_type: FILE});
    }
    
    onHandleChange(userVariable, value) {
        this.setState({
            user: {
                ...this.state.user,
                [userVariable]: value
            }
        })
    }

    render() {
        const { fileReports, fileReportsStatus } = this.props;
        return (
            <ScrollView style={styles.container}>
                {fileReportsStatus === LOADING && 
                    <View>
                        <Loader/>
                    </View>
                }
                {fileReportsStatus === SUCCESS && 
                    <View>
                        {fileReports && fileReports.reports.map(eachReport => 
                            <View key={eachReport.id} style={styles.cardContainer}>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Id:- </Text>
                                    <Text style={styles.contentText}>{eachReport.id}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Email:- </Text>
                                    <Text style={styles.contentText}>{ eachReport.mark_report ? eachReport.mark_report.email : eachReport.proprietor_report ? eachReport.proprietor_report.email : "-" }</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Created:- </Text>
                                    <Text style={styles.contentText}>{standardizeDate(eachReport.created)}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Modified:- </Text>
                                    <Text style={styles.contentText}>{standardizeDate(eachReport.modified)}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Report's Title:- </Text>
                                    <Text style={styles.contentText}>{eachReport.mark_report?"Mark":"-"}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Report's Title:- </Text>
                                    <Text style={styles.contentText}>{eachReport.proprietor_report?"Proprietor":"-"}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Report's Title:- </Text>
                                    <Text style={styles.contentText}>{eachReport.mark_report?eachReport.mark_report.title:eachReport.proprietor_report?eachReport.proprietor_report.title:"-"}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Type:- </Text>
                                    <Text style={styles.contentText}>{eachReport.mark_report?eachReport.mark_report.type:eachReport.proprietor_report?eachReport.proprietor_report.type:"-"}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Selected Marks:- </Text>
                                    <Text style={styles.contentText}>{eachReport.marks_count}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>File Type:- </Text>
                                    <Text style={styles.contentText}>{eachReport.type}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>Report:- </Text>
                                    <Text style={styles.contentText}>{eachReport.report_owner}</Text>
                                </View>
                                <View style={styles.cardBodyContainer}>
                                    <Text style={styles.contentHeading}>ReQueue:- </Text>
                                    <Text style={styles.contentText}>{eachReport.report_owner}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                }
                {fileReportsStatus === ERROR && 
                    <View>
                        <Text>Error</Text>
                    </View>
                }
            </ScrollView>
        );
    }
}

const mapDispatchToProps = {
    signIn,
    queueReport, 
    getUnavailableReports
};

const mapStateToProps = (state) => {
    console.log('state', state);
    const { 
        fileReports,
        fileReportsStatus,
        proprietorReports,
        proprietorReportsStatus,
        searchReports,
        searchReportsStatus
    } = state.report;
    return { 
        fileReports,
        fileReportsStatus,
        proprietorReports,
        proprietorReportsStatus,
        searchReports,
        searchReportsStatus 
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
        // width: 200
    },
    cardBodyContainer: {
        width:'100%',
        flex: 1,
        flexDirection: 'row'
    },
    contentHeading: {
        fontWeight: '600'
    },

    contentText: {
        fontWeight: '400'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(File);
