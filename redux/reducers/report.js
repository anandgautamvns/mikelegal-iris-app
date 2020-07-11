import { 
    SEARCH_GET_NA_FILE_REPORTS,
    SEARCH_GET_NA_PROPRIETOR_REPORTS,
    SEARCH_GET_NA_SEARCH_REPORTS,
    WATCH_GET_NA_REPORTS,
    MANAGER_GET_NA_REPORTS,

    SEARCH_FILE_REPORTS_QUEUE,
    SEARCH_PROPRIETOR_REPORTS_QUEUE,
    SEARCH_SEARCH_REPORTS_QUEUE,
    WATCH_REPORTS_QUEUE,
    MANAGER_REPORTS_QUEUE
} from '../actions/types';

export default function( state = {
    fileReports: null,
    fileReportsStatus: null,
    proprietorReports: null,
    proprietorReportsStatus: null,
    searchReports: null,
    searchReportsStatus: null,
}, action ){
    switch (action.type) {
        // case SRCH_GET_NA_FILE_REPS:
        //     { const sortedReports = sortRecords(action.payload.reports)
        //         return {
        //             ...state,
        //             fileReports: sortedReports
        //         };
        //     }

        case SEARCH_GET_NA_FILE_REPORTS:
            return {
                ...state,
                fileReports: action.payload,
                fileReportsStatus: action.status
            };

        case SEARCH_GET_NA_PROPRIETOR_REPORTS:
            return {
                ...state,
                proprietorReports: action.payload,
                proprietorReportsStatus: action.status
            };

        case SEARCH_GET_NA_SEARCH_REPORTS:
            return {
                ...state,
                searchReports: action.payload,
                searchReportsStatus: action.status
            };
    
        default:
            return state;
    }
}