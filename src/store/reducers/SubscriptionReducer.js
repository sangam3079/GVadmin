import * as actions from '../actions/Subscription/SubscriptionAction.js';
const initialState = {
    data : [],
    subscription : {},
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    unsubscribedUser : [],
    keyword : undefined
}

export default function subscriptionReducer(state = initialState, action){
    let {payload} = action;
    switch(action.type){
        case actions.SET_SUBSCRIPTION_DATA:
            return{
                ...state,
                data : action.payload
            }
        case actions.SET_SUBSCRIPTION_META:
            return{
                ...state,
                total : payload.total,
                totalPage : payload.pages,
                currentPage : payload.page
            }
        case actions.UPDATE_SUBSCRIPTION:
            let updated_data = [];
            state.data.forEach((subscription, index) => {
                if(subscription.id === action.id){
                    updated_data = [...state.data];
                let updated_subscription = {...updated_data[index]}
                updated_subscription = {
                    ...updated_subscription,
                    ...action.payload
                }
                updated_data[index] = updated_subscription
                }
            })
            return {
                ...state,
                data : updated_data
            }
        case actions.SET_SUBSCRIPTION:
            return{
                ...state,
                subscription : payload
            }
        case actions.NEW_SUBSCRIPTION:
            let new_data = [action.payload,...state.data]
            return {
                ...state,
                data : new_data
            }
        case actions.SET_UNSUB_USERS:
            return {
                ...state,
                unsubscribedUser : payload
            }
        case actions.SET_SUBSCRIPTION_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case actions.SET_SUBSCRIPTION_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        default :
            return state;
    }
}