import * as actions from 'store/actions/Download/DownloadAction'

const initialState = {
    data : [],
    total : undefined,
    totalPage : undefined,
    currenPage : 1,
    keyword : undefined
}

export default function DownloadReducer(state = initialState, action){
    let {payload} = action
    switch (action.type){
        case actions.SET_DOWNLOAD_DATA:
            return{
                ...state,
                data : action.payload
            }
        case actions.SET_DOWNLOAD_META:
            let {total, pages, page} = payload;
            return{
                ...state,
                total,
                totalPage : pages,
                currenPage : page
            }
        case actions.SET_DOWNLOAD_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case actions.SET_DOWNLOAD_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        default:
            return state
    } 
}