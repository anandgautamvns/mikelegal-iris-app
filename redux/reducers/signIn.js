import { AUTHENTICATE, SIGN_IN, SIGN_OUT, RESTORE_TOKEN, SUBSCRIPTION } from '../actions/types';
import { LOADING, SUCCESS, ERROR } from '../../constants/GeneralConstants';

export default function( state = {
    authenticate: false,
    // userToken: null,
    logInStatus: null,

    isLoading: true,
    isSignout: false,
    userToken: null,

    subscriptionProfile: null,
    subscriptionQuota: null,
    subscriptionStatus: null,
}, action ){
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                authenticate: action.payload,
                userToken: action.token,
                logInStatus: action.status
            };

        case RESTORE_TOKEN:
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case SIGN_IN:
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
            };
        case SIGN_OUT:
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
            };

        case SUBSCRIPTION:
            switch (action.status) {
                case LOADING:
                    return {
                        ...state,
                        subscriptionStatus: LOADING
                    };
                    break;

                case SUCCESS:
                    return {
                        ...state,
                        subscriptionProfile: action.payload.subscriptions,
                        subscriptionQuota: action.payload.uploaded_documents_quota,
                        subscriptionStatus: SUCCESS
                    };
                    break;

                case ERROR:
                    return {
                        ...state,
                        subscriptionStatus: ERROR
                    };
                    break;
            
                default:
                    break;
            }
        default:
            return state;
    }
}