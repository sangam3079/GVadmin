export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_METRICS = 'SET_METRICS'
export const SET_USER_GROWTH = 'SET_USER_GROWTH'

export function setCurrentUser(payload){
    return {
        type : SET_CURRENT_USER,
        payload
    }
}

export function setMetrics(payload){
    return{
        type : SET_METRICS,
        payload
    }
}

export function setUserGrowthData(payload){
    return{
        type : SET_USER_GROWTH,
        payload
    }
}