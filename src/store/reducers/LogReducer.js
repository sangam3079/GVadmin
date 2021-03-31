import * as actions from '../actions/Log/LogAction.js'

const initialStore = {
    data : [],
    total : undefined,
    totalPage : undefined,
    currentPage : 1
}

export default function logReducer(state = initialStore, action){
    let {payload} = action
    switch(action.type){
        case actions.SET_ALL_LOG_DATA:
            return{
                ...state,
                data : payload
            }
        case actions.SET_LOG_META:
            return{
                ...state,
                total : payload.total,
                totalPage : payload.pages,
                currentPage : payload.page
            }
        default :
            return state
    }
}