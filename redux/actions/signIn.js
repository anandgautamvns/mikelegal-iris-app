import Axios from "axios";
import { ROOT_URL, IRIS_URL } from '../../config';
import { AsyncStorage } from 'react-native';

import { 
    AUTHENTICATE,
    SUBSCRIPTION,

    // resend_reports
    SEARCH_GET_NA_FILE_REPORTS,
    SEARCH_GET_NA_PROPRIETOR_REPORTS,
    SEARCH_GET_NA_SEARCH_REPORTS,
    WATCH_GET_NA_REPORTS,
    MANAGER_GET_NA_REPORTS,

    // requeue_reports
    SEARCH_FILE_REPORTS_QUEUE,
    SEARCH_PROPRIETOR_REPORTS_QUEUE,
    SEARCH_SEARCH_REPORTS_QUEUE,
    WATCH_REPORTS_QUEUE,
    MANAGER_REPORTS_QUEUE,

} from './types';

import { LOADING, SUCCESS, ERROR, TM_SEARCH, TM_WATCH, TM_MANAGER, FILE, SEARCH, PROPRIETOR } from '../../constants/GeneralConstants';

//--------SIGN IN--------
export function signIn(user) {
    return async (dispatch) => {
        dispatch({ type: AUTHENTICATE, status: LOADING });
        try {
            const response = await Axios.post(`${ROOT_URL}/login/`,
                { 
                    username: user.username, 
                    password: user.password, 
                    product: "iris" 
                }
            )
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: AUTHENTICATE, status: SUCCESS, payload: true });
            console.log('this.props', this.props);
            
            // this.props.navigation.navigate('Profile')
            // this.history.push("/control-center");
        }
        catch (error) {
            dispatch({ type: AUTHENTICATE, status: ERROR, payload: false });
        }
    }
}

//--------SUBSCRIPTION--------
export function getSubscriptionProfile() {
    return async (dispatch) => {
        const authToken = await AsyncStorage.getItem('token');
        dispatch({ type: SUBSCRIPTION, status: LOADING });
        let response;
        try {
            response = await Axios.get(`${ROOT_URL}/subscriptions/`, {
                headers: { Authorization: 'Token ' + authToken }
            })
            dispatch({ type: SUBSCRIPTION, status: SUCCESS, payload: response.data});
        }
        catch (error) {
            dispatch({ type: SUBSCRIPTION, status: ERROR, payload: error.response.data });
        }
    }
}

//--------SEARCH|WATCH|MANAGER: GET UNAVAILABLE REPORTS--------
export function getUnavailableReports({product_name, search_report_type}) {
    return async(dispatch) => {
        const authToken = await AsyncStorage.getItem('token');
        switch (product_name) {
            case TM_SEARCH:
                switch (search_report_type) {
                    case FILE:
                        dispatch({ type: SEARCH_GET_NA_FILE_REPORTS, status: LOADING });
                        try {
                            const response = await Axios.get(`${IRIS_URL}/resend_report/`, {
                                params: { product_name, search_report_type },
                                headers: { Authorization: 'Token ' + authToken }
                            })
                            dispatch({ type: SEARCH_GET_NA_FILE_REPORTS, status: SUCCESS, payload: response.data });
                        } catch (error) {
                            dispatch({ type: SEARCH_GET_NA_FILE_REPORTS, status: ERROR, payload: error.response.data });
                        }
                        break;

                    case PROPRIETOR:
                        dispatch({ type: SEARCH_GET_NA_PROPRIETOR_REPORTS, status: LOADING });
                        try {
                            const response = await Axios.get(`${IRIS_URL}/resend_report/`, {
                                params: { product_name, search_report_type },
                                headers: { Authorization: 'Token ' + authToken }
                            })
                            dispatch({ type: SEARCH_GET_NA_PROPRIETOR_REPORTS, status: SUCCESS, payload: response.data });
                        } catch (error) {
                            // dispatch({ type: SEARCH_GET_NA_PROPRIETOR_REPORTS, status: ERROR, payload: error.response.data });
                        }
                        break;
                        
                    case SEARCH:
                        dispatch({ type: SEARCH_GET_NA_SEARCH_REPORTS, status: LOADING });
                        try {
                            const response = await Axios.get(`${IRIS_URL}/resend_report/`, {
                                params: { product_name, search_report_type },
                                headers: { Authorization: 'Token ' + authToken }
                            })
                            dispatch({ type: SEARCH_GET_NA_SEARCH_REPORTS, status: SUCCESS, payload: response.data });
                        } catch (error) {
                            // dispatch({ type: SEARCH_GET_NA_SEARCH_REPORTS, status: ERROR, payload: error.response.data });
                        }
                        break;
                
                    default:
                        break;
                }

            case TM_WATCH:
                dispatch({ type: WATCH_GET_NA_REPORTS, status: LOADING });
                try {
                    const response = await Axios.get(`${IRIS_URL}/resend_report/`, {
                        params: { product_name, search_report_type },
                        headers: { Authorization: 'Token ' + authToken }
                    })
                    dispatch({ type: WATCH_GET_NA_REPORTS, status: SUCCESS, payload: response.data });
                } catch (error) {
                    // dispatch({ type: WATCH_GET_NA_REPORTS, status: ERROR, payload: error.response.data });
                }
                break;

            case TM_MANAGER:
                dispatch({ type: MANAGER_GET_NA_REPORTS, status: LOADING });
                try {
                    const response = await Axios.get(`${IRIS_URL}/resend_report/`, {
                        params: { product_name, search_report_type },
                        headers: { Authorization: 'Token ' + authToken }
                    })
                    dispatch({ type: MANAGER_GET_NA_REPORTS, status: SUCCESS, payload: response.data });
                } catch (error) {
                    // dispatch({ type: MANAGER_GET_NA_REPORTS, status: ERROR, payload: error.response.data });
                }
                break;
        
            default:
                break;
        }
    }
}

//--------SEARCH|WATCH|MANAGER: QUEUE REPORT--------
export function queueReport({ product_name, search_report_type, report_id, report_file_id = null, proprietor_flag = null }) {
    return async (dispatch) => {
        const authToken = await AsyncStorage.getItem('token');
        switch (product_name) {
            case TM_SEARCH:
                switch (search_report_type) {
                    case FILE:
                        dispatch({ type: SEARCH_FILE_REPORTS_QUEUE, status: LOADING });
                        try {
                            const response = await Axios.post(`${IRIS_URL}/resend_report/`,
                                {
                                    product_name,
                                    search_report_type,
                                    report_id,
                                    report_file_id,
                                    proprietor_flag
                                },
                                {
                                    headers: { Authorization: 'Token ' + authToken }
                                }
                            )
                            dispatch({ type: SEARCH_FILE_REPORTS_QUEUE, status: SUCCESS, payload: response.data });
                        } catch (error) {
                            dispatch({ type: SEARCH_FILE_REPORTS_QUEUE, status: ERROR, payload: response.data });
                        }
                        break;

                    case PROPRIETOR:
                        dispatch({ type: SEARCH_PROPRIETOR_REPORTS_QUEUE, status: LOADING });
                        try {
                            const response = await Axios.post(`${IRIS_URL}/resend_report/`,
                                {
                                    product_name,
                                    search_report_type,
                                    report_id,
                                    report_file_id,
                                    proprietor_flag
                                },
                                {
                                    headers: { Authorization: 'Token ' + authToken }
                                }
                            )
                            dispatch({ type: SEARCH_PROPRIETOR_REPORTS_QUEUE, status: SUCCESS, payload: response.data });
                        } catch (error) {
                            dispatch({ type: SEARCH_PROPRIETOR_REPORTS_QUEUE, status: ERROR, payload: response.data });
                        }
                        break;

                    case SEARCH:
                        dispatch({ type: SEARCH_SEARCH_REPORTS_QUEUE, status: LOADING });
                        try {
                            const response = await Axios.post(`${IRIS_URL}/resend_report/`,
                                {
                                    product_name,
                                    search_report_type,
                                    report_id,
                                    report_file_id,
                                    proprietor_flag
                                },
                                {
                                    headers: { Authorization: 'Token ' + authToken }
                                }
                            )
                            dispatch({ type: SEARCH_SEARCH_REPORTS_QUEUE, status: SUCCESS, payload: response.data });
                        } catch (error) {
                            dispatch({ type: SEARCH_SEARCH_REPORTS_QUEUE, status: ERROR, payload: response.data });
                        }
                        break;

                    default:
                        break;
                }
                break;

            case TM_WATCH:
                dispatch({ type: WATCH_REPORTS_QUEUE, status: LOADING });
                try {
                    const response = await Axios.post(`${IRIS_URL}/resend_report/`,
                        {
                            product_name,
                            search_report_type,
                            report_id,
                            report_file_id,
                            proprietor_flag
                        },
                        {
                            headers: { Authorization: 'Token ' + authToken }
                        }
                    )
                    dispatch({ type: WATCH_REPORTS_QUEUE, status: SUCCESS, payload: response.data });
                } catch (error) {
                    dispatch({ type: WATCH_REPORTS_QUEUE, status: ERROR, payload: response.data });
                }
                break;

            case TM_MANAGER:
                dispatch({ type: MANAGER_REPORTS_QUEUE, status: LOADING });
                try {
                    const response = await Axios.post(`${IRIS_URL}/resend_report/`,
                        {
                            product_name,
                            search_report_type,
                            report_id,
                            report_file_id,
                            proprietor_flag
                        },
                        {
                            headers: { Authorization: 'Token ' + authToken }
                        }
                    )
                    dispatch({ type: MANAGER_REPORTS_QUEUE, status: SUCCESS, payload: response.data });
                } catch (error) {
                    dispatch({ type: MANAGER_REPORTS_QUEUE, status: ERROR, payload: response.data });
                }
                break;

            default:
                break;
        }
    }
}


// //--------LIBRARIES--------
// import axios from 'axios';

// //--------AUTH--------
// import { AUTHENTICATE, IMAGE_SEARCH_RESULTS, REGISTRATION } from "./types";

// //--------MANAGER--------
// import {
//     MGR_GET_MEGAS,

//     MGR_GET_NA_REPS,
//     MGR_GET_MARK,
//     MGR_ADD_MSG,
//     MGR_DELETE_MSG,

//     //--------HEARINGS--------
//     HEARING_REPORT,
//     HEARING_SEND_EMIL,
// } from "./types";

// //--------SEARCH--------
// import {
//     SRCH_GET_NA_FILE_REPS,
//     SRCH_GET_NA_SRCH_REPS,
//     SRCH_GET_NA_PRP_REPS,
// } from "./types";

// //--------WATCH--------
// import {
//     WAT_GET_NA_REPS,
//     WAT_GET_MARK,
//     WAT_ADD_MSG,
//     WAT_DELETE_MSG,
//     WAT_GET_JOURNAL_MARK,
//     WAT_JOURNAL_MARK_MSG,
// } from "./types";

// //--------CONTROL CENTER--------
// import {
//     CC_GET_CONTROL_CENTER,
//     CC_SEARCH_MARK,
//     CC_REFRESH_MARK,
// } from "./types";

// //--------CEASE DESIST--------
// import {
//     CD_GET_MARK,
//     RESET_CD_GET_MARK,
//     CD_DELETE_MARK,
//     CD_GET_REPORT,
//     RESET_CD_GET_REPORT,
// } from "./types";

// //--------CONFIGS--------
// import { LOGIN_URL, ROOT_URL } from "./rootConfig";

// //--------GENERAL CONSTANTS--------
// import {
//     TM_SEARCH,
//     TM_WATCH,
//     TM_MANAGER,
//     FILE,
//     SEARCH,
//     PROPRIETOR,
//     WHATS_NEW_MSG
// } from "./types";

// import { changeCustomDateToCalendar, checkValue } from '../functions/functions';

// //--------SIGN IN--------
// export function signIn(user) {
//     return (dispatch) => {
//         axios.post(`${LOGIN_URL}/login/`, { username: user.username, password: user.password, product: "iris" })
//             .then(response => {
//                 dispatch({ type: AUTHENTICATE, payload: true });
//                 localStorage.setItem("token", response.data.token);
//                 this.history.push("/control-center");
//             }).catch(err => {
//                 if (err) {
//                     alert(err);
//                 }
//             });
//     };
// }

// //--------MANAGER: GET MEGATRONS--------
// export function getMegatronsMGR() {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/management_megatrons/`, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: MGR_GET_MEGAS, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------MANAGER: SPAWN MEGATRONS--------
// export function spawnMegatronsMGR({ periodic, megatron_id }) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/management_megatrons/`, { periodic: periodic, profile_id: megatron_id }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             this.getMegatronsMGR();
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------CONTROL CENTER: LATEST TRADEMARKS REFRESH--------
// export function latestTrademarksScraperManagerCC() {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/trademark_scrapers/`, { scraper_name: "latest_trademark_refresh" }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//         }).catch(err => {
//             alert(err);
//         });
//     }
// }

// //--------CONTROL CENTER: MISSED TRADEMARKS REFRESH--------
// export function missedTrademarksRefreshCC() {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/trademark_scrapers/`, { scraper_name: "missed_latest_trademarks_fetch" }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//         }).catch(err => {
//             alert(err);
//         });
//     }
// }

// //--------SEARCH|WATCH|MANAGER: GET UNAVAILABLE REPORTS--------
// export function getUnavailableReports({ product_name, search_report_type }) {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/resend_report/`, {
//             params: { product_name, search_report_type },
//             headers: { Authorization: 'Token ' + localStorage.getItem("token") }
//         }).then(response => {
//             switch (product_name) {
//                 case TM_SEARCH:
//                     switch (search_report_type) {
//                         case FILE:
//                             dispatch({ type: SRCH_GET_NA_FILE_REPS, payload: response.data });
//                             break;

//                         case PROPRIETOR:
//                             dispatch({ type: SRCH_GET_NA_PRP_REPS, payload: response.data });
//                             break;

//                         case SEARCH:
//                             dispatch({ type: SRCH_GET_NA_SRCH_REPS, payload: response.data });
//                             break;

//                         default:
//                             break;
//                     }
//                     break;

//                 case TM_WATCH:
//                     dispatch({ type: WAT_GET_NA_REPS, payload: response.data });
//                     break;

//                 case TM_MANAGER:
//                     dispatch({ type: MGR_GET_NA_REPS, payload: response.data });
//                     break;

//                 default:
//                     break;
//             }
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     }
// }

// //--------CONTROL CENTER: GET CONTROL CENTER--------
// export function getControlCenter() {
//     return (dispatch) => {
//         axios.get(`https://miketmapi.mikelegal.com/api/control-center/`)
//             .then(response => {
//                 dispatch({ type: CC_GET_CONTROL_CENTER, payload: response.data });
//             }).catch(err => {
//                 if (err) {
//                     alert(err);
//                 }
//             });
//     }
// }

// //--------CEASE DESIST: GET CEASE DESIST MARK--------
// export function getMarkCD() {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/cease_desist_marks/`, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: CD_GET_MARK, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------CEASE DESIST: ADD_PROFILE_MARK--------
// export function addProfileMark(mark, add) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/cease_desist_marks/`, { term: mark.ceaseWord, application_number: mark.ceaseApplication, focus_class: mark.classList.split(",").map(x => parseInt(x)), profile_id: mark.jwp, function: add }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: CD_GET_MARK, payload: response.data });
//             this.getMarkCD();
//             // alert(response.data.message)
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------CEASE DESIST: DELETE_PROFILE_MARK--------
// export function deleteProfileMark(id, remove) {
//     return function (dispatch) {
//         axios.post(`${ROOT_URL}/cease_desist_marks/`, { function: remove, profile_id: id }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         })
//             .then(response => {
//                 dispatch({ type: CD_DELETE_MARK, payload: { response: response.data, profile_id: id } });
//                 //   alert(response.data.message)
//             })
//             .catch(err => {
//                 if (err) {
//                     alert(err);
//                 }
//             });
//     }
// }

// //--------CEASE DESIST: RESET CEASE DESIST MARK--------
// export function resetMarkCD() {
//     return {
//         type: RESET_CD_GET_MARK
//     }
// }

// //--------CEASE DESIST: GET CEASE DESIST MARK--------
// export function getReportCD() {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/cease_desist_report/`, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: CD_GET_REPORT, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------CEASE DESIST: GET CEASE DESIST GENERATE REPORT--------
// export function generateReport(reportData) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/cease_desist_report/`, { date_from: changeCustomDateToCalendar(reportData.DateFrom), date_to: changeCustomDateToCalendar(reportData.DateTo), profile_id: reportData.jwp }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             this.getReportCD();
//             // alert(response.data.message)
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------CEASE DESIST: RESET CEASE DESIST GENERATE REPORT--------
// export function resetReportCD() {
//     return {
//         type: RESET_CD_GET_REPORT
//     }
// }

// //--------MANAGER: GET MANAGER MARK--------
// export function getManagerMark() {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/manager_marks/`, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: MGR_GET_MARK, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------MANAGER: MGR_ADD_MSG--------
// export function addManagerMark(mark, markType) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/manager_marks/`,
//             {
//                 mm_type: mark.managerType,
//                 application_numbers: mark.managerApplicationNo.split(",").map(x => parseInt(x)),
//                 profile_id: mark.managerProfile,
//                 function: markType
//             }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: MGR_ADD_MSG, payload: response.data });
//             this.getManagerMark();
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------MANAGER: MGR_DELETE_MSGK--------
// export function deleteManagerMark(mark, markType) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/manager_marks/`,
//             {
//                 mm_type: mark.managerType,
//                 application_numbers: mark.managerApplicationNo.split(",").map(x => parseInt(x)),
//                 profile_id: mark.managerProfile,
//                 function: markType
//             }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: MGR_DELETE_MSG, payload: response.data });
//             this.getManagerMark();
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------WATCH: GET WATCH MARK--------
// export function getWatchMark() {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/watch_marks/`, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: WAT_GET_MARK, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------WATCH: WAT_ADD_MSG--------
// export function addWatchMark(mark, markType) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/watch_marks/`, { application_numbers: mark.managerApplicationNo.split(",").map(x => parseInt(x)), profile_id: mark.managerProfile, function: markType }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: WAT_ADD_MSG, payload: response.data });
//             this.getWatchMark();
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------WATCH: WAT_DELETE_MSGK--------
// export function deleteWatchMark(mark, markType) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/watch_marks/`, { application_numbers: mark.managerApplicationNo.split(",").map(x => parseInt(x)), profile_id: mark.managerProfile, function: markType }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: WAT_DELETE_MSG, payload: response.data });
//             this.getWatchMark();
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------CONTROL CENTER: CC_SEARCH_MARKS--------
// export function searchControlCenterMark(mark, markType) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/refresh_marks/`, { application_numbers: mark.enterApplicationNo.split(",").map(x => parseInt(x)), function: markType }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: CC_SEARCH_MARK, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------CONTROL CENTER: CC_SEARCH_MARKS--------
// export function refreshControlCenterMark(mark, markType) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/refresh_marks/`, { application_numbers: mark.enterRefreshApplicationNo.split(",").map(x => parseInt(x)), function: markType }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: CC_REFRESH_MARK, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------WATCH: GET LATEST JOURNAL MARK--------
// export function getWatchJournalMark() {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/latest_journal/`, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: WAT_GET_JOURNAL_MARK, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------WATCH: LATEST JOURNAL MARK MSG--------
// export function msgWatchJournalMark(journalType) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/latest_journal/`, { function: journalType }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: WAT_JOURNAL_MARK_MSG, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------WATCH|MANAGER: DOWNLOAD MARK--------
// export function downloadMark(mark, productType) {
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/download_portfolio/`, { id: mark.managerProfile, product: productType }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             // dispatch({type: WAT_JOURNAL_MARK_MSG, payload: response.data});
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------MANAGER: HEARING--------
// export function getHearingReport() {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/tla_opposition_report/`, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         }).then(response => {
//             dispatch({ type: HEARING_REPORT, payload: response.data });
//         }).catch(err => {
//             if (err) {
//                 alert(err);
//             }
//         });
//     };
// }

// //--------MANAGER: SEND EMAIL--------
// export function sendEmail(EMAIL, opposition_report, tla_report) {
//     return function (dispatch) {
//         axios.post(`${ROOT_URL}/tla_opposition_report/`, { function: EMAIL, opposition_report: opposition_report, tla_report: tla_report }, {
//             headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//         })
//             .then(response => {
//                 dispatch({ type: HEARING_SEND_EMIL, payload: response.data });
//                 alert(response.data.message)
//             })
//             .catch(err => {
//                 if (err) {
//                     alert(err);
//                 }
//             });
//     }
// }

// //--------Whats New: Create--------
// export function createWhatsNew(whatsNew) {
//     let formData = new FormData();
//     formData.append('type', whatsNew.type);
//     formData.append('title', whatsNew.title);
//     formData.append('date_of_update', whatsNew.date_of_update);
//     formData.append('content', whatsNew.content);
//     formData.append('image', checkValue(whatsNew.image) ? whatsNew.image[0] : null);
//     return (dispatch) => {
//         axios.post(`${ROOT_URL}/whats_new/`, formData,
//             {
//                 headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//             }).then(response => {
//                 dispatch({ type: WHATS_NEW_MSG, payload: response.data });
//             }).catch(err => {
//                 if (err) {
//                     alert(err);
//                 }
//             });
//     };
// }

// //-------- Image Search: Create--------
// export function createImageSearch(whatsNew) {
//     let formData = new FormData();
//     formData.append('image', checkValue(whatsNew.image) ? whatsNew.image[0] : null);
//     return (dispatch) => {
//         axios.post(`${LOGIN_URL}/image-search/`, formData,
//             {
//                 headers: { Authorization: 'Token ' + localStorage.getItem('token') }
//             }).then(response => {
//                 dispatch({ type: IMAGE_SEARCH_RESULTS, payload: response.data });
//             }).catch(err => {
//                 if (err) {
//                     alert(err);
//                 }
//             });
//     };
// }

// //--------Registration--------
// export function registration(user) {
//     return (dispatch) => {
//         axios.post(`${LOGIN_URL}/registration/`, 
//             { 
//                 email: user.email, 
//                 password: user.password, 
//                 confirm_password: user.confirm_password, 
//                 superuser_request: user.superuser_request 
//             })
//             .then(response => {
//                 dispatch({ type: REGISTRATION, payload: response.data });
//                 alert('Your registration has been completed successfully!');
//             }).catch(err => {
//                 if (err) {
//                     alert(err.response.data.error);
//                 }
//             });
//     };
// }
