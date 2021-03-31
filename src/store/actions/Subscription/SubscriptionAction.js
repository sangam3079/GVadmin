export const SET_SUBSCRIPTION_DATA = 'SET_SUBSCRIPTION_DATA'
export const SET_SUBSCRIPTION_META = 'SET_SUBSCRIPTION_META'
export const SET_SUBSCRIPTION = 'SET_SUBSCRIPTION'
export const NEW_SUBSCRIPTION = 'NEW_SUBSCRIPTION'
export const UPDATE_SUBSCRIPTION = 'UPDATE_SUBSCRIPTION'
export const SET_UNSUB_USERS = 'SET_UNSUB_USERS'
export const SET_SUBSCRIPTION_KEYWORD = 'SET_SUBSCRIPTION_KEYWORD'
export const SET_SUBSCRIPTION_CURRENTPAGE = 'SET_SUBSCRIPTION_CURRENTPAGE'

export function setSubscriptionData(payload){
    return{
        type : SET_SUBSCRIPTION_DATA,
        payload
    }
}

export function setMeta(payload){
    return{
        type : SET_SUBSCRIPTION_META,
        payload : {...payload}
    }
}

export function addSubscription(payload){
    return {
        type : NEW_SUBSCRIPTION,
        payload
    }
}

export function setSubscription(payload){
    return {
        type : SET_SUBSCRIPTION,
        payload
    }
}

export function subscriptionUpdate({id, payload}){
    return{
        type : UPDATE_SUBSCRIPTION,
        payload,
        id
    }
}

export function setUnSubUsers(payload){
    return{
        type : SET_UNSUB_USERS,
        payload
    }
}

export function setSubscriptionKeyword(payload){
    return {
        type : SET_SUBSCRIPTION_KEYWORD,
        payload
    }
}

export function setSubscriptionCurrentpage(payload){
    return {
        type : SET_SUBSCRIPTION_CURRENTPAGE,
        payload
    }
}