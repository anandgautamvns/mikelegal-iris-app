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
            dispatch({ 
                type: AUTHENTICATE, 
                status: SUCCESS, 
                payload: true,
                token: response.data.token
            });
            console.log('this.props', this.props);
            
            // this.props.navigation.navigate('Profile')
            // this.history.push("/control-center");
        }
        catch (error) {
            dispatch({ type: AUTHENTICATE, status: ERROR, payload: false });
        }
    }
}

//--------SIGN Out--------
export function signOut() {
    return async (dispatch) => {
        AsyncStorage.removeItem('token');
        AsyncStorage.clear()
        dispatch({ 
            type: AUTHENTICATE, 
            payload: false,
            token: null
        });
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
