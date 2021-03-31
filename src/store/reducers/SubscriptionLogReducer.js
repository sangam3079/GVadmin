import * as actions from '../actions/Log/LogAction.js'
import * as subActions from '../actions/Subscription/SubscriptionAction'

const initialStore = {
    data : [],
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    keyword : undefined
}

export default function SubscriptionLogRedecuer(state = initialStore, action){
    let {payload} = action
    switch(action.type){
        case actions.SET_SUBSCRIPTION_LOG_DATA:
            return{
                ...state,
                data : payload
            }
        case actions.SET_SUBSCRIPTION_LOG_META:
            return{
                ...state,
                total : payload.total,
                totalPage : payload.pages,
                currentPage : payload.page
            }
        case subActions.SET_SUBSCRIPTION_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case subActions.SET_SUBSCRIPTION_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        default :
            return state
    }
}