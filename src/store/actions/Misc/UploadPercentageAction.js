export const SET_UPLOAD_PERCENTAGE = 'SET_UPLOAD_PERCENTAGE'
export const CLEAR_UPLOAD_PERCENTAGE = 'CLEAR_UPLOAD_PERCENTAGE'

export function setUploadPercentage(payload){
    return {
        type : SET_UPLOAD_PERCENTAGE,
        payload
    }
}

export function clearUploadPercentage(){
    return{
        type : CLEAR_UPLOAD_PERCENTAGE
    }
}