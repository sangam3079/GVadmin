export const SET_ALL_LOG_DATA = 'SET_ALL_LOG_DATA'
export const SET_LOG_META = 'SET_LOG_META'
export const SET_SUBSCRIPTION_LOG_DATA = 'SET_SUBSCRIPTION_LOG_DATA'
export const SET_SUBSCRIPTION_LOG_META = 'SET_SUBSCRIPTION_LOG_META'

export function setLogData(payload){
    return{
        type : SET_ALL_LOG_DATA,
        payload
    }
}

export function setMeta(payload){
    return{
        type : SET_LOG_META,
        payload : {...payload}
    }
}

export function setSubscriptionLogData(payload){
    return{
        type : SET_SUBSCRIPTION_LOG_DATA,
        payload
    }
}

export function setSubscriptionLogMeta(payload){
    return{
        type : SET_SUBSCRIPTION_LOG_META,
        payload : {...payload}
    }
}
