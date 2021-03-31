export const Error500 = 'error500'
export const ApiCallError = 'apiCallError'

export function error500(obj){
    return{
        type : Error500,
        payload : obj
    }
}

export function apiCallError(obj){
    return {
        type : ApiCallError,
        payload : obj
    }
}