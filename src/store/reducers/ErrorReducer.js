import * as actions from '../actions/Error/ErrorActions'

const initialState = {
    status_code : undefined,
    error_message : undefined
}

export default function errorReducer(state = initialState, action){
    switch(action.type){
        case actions.error500 : 
            return{
                ...state,
                status_code : action.payload.status_code,
                error_message : action.payload.error_message
            }
        default:
            return state
    }
}