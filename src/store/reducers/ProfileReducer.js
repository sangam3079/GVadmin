import * as actions from '../actions/Profile/ProfileActions'

const initialState = {
    currentUser : {},
    metrics : {},
    userGrowth : {}
}

export default function ProfileReducer(state = initialState, action ){
    switch (action.type){
        case actions.SET_CURRENT_USER:
            console.log('hello',state);
            return{
                ...state,
                currentUser : action.payload
            }
        case actions.SET_METRICS:
            return{
                ...state,
                metrics : action.payload
            }
        case actions.SET_USER_GROWTH:
            return {
                ...state,
                userGrowth : action.payload
            }
        default :
            return state;
    }
}