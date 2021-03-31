import * as actions from '../actions/Misc/UploadPercentageAction'

const initialState = {
    percentage : undefined
}

export default function UploadPercentageReducer(state = initialState, action){
    let {payload} = action
    switch(action.type){
        case actions.SET_UPLOAD_PERCENTAGE:
            return{
                ...state,
                percentage : payload
            }
        case actions.CLEAR_UPLOAD_PERCENTAGE:
            return{
                ...state,
                percentage : undefined
            }
        default :
            return state
    }
}