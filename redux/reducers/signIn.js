import { AUTHENTICATE, SUBSCRIPTION } from '../actions/types';
import { LOADING, SUCCESS, ERROR } from '../../constants/GeneralConstants';

export default function( state = {
    authenticate: false,
    logInStatus: null,
    subscriptionProfile: null,
    subscriptionQuota: null,
    subscriptionStatus: null,
}, action ){
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                authenticate: action.payload,
                logInStatus: action.status
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