import * as actions from '../actions/Playlist/PlaylistAction'
const initialState = {
    data : [],
    playlist : {},
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    keyword : undefined
}

export default function playlistReducer(state = initialState, action){
    let {payload} = action;
    switch(action.type){
        case actions.SET_PLAYLIST_DATA:
            return {
                ...state,
                data : payload
            }
        case actions.SET_PLAYLIST_META:
            return {
                ...state,
                ...payload
            }
        case actions.DELETE_PLAYLIST:
            const clone = [...state.data]
            const dataWithoutDeleted = clone.filter(playlist => playlist.id !== payload)
            return {
                ...state,
                data : dataWithoutDeleted
            }
        case actions.UPDATE_PLAYLIST:
            let updated_data = [];
            state.data.forEach((playlist, index) => {
                if(playlist.id === action.id){
                    updated_data = [...state.data]
                    let updated_playlist = {...updated_data[index]}
                    updated_playlist = {
                        ...updated_playlist,
                        ...payload
                    }
                    updated_data[index] = updated_playlist
                }
            })
            return{
                ...state,
                data : updated_data
            }
        case actions.SET_A_PLAYLIST:
            return{
                ...state,
                playlist : payload
            }
        case actions.NEW_PLAYLIST:
            const new_data = [payload, ...state.data];
            return{
                data : new_data
            }
        case actions.SET_PLAYLIST_CURRENTPAGE:
        return {
            ...state,
            currentPage : action.payload
        }
    case actions.SET_PLAYLIST_KEYWORD:
        return {
            ...state,
            keyword : action.payload
        }
        default :
            return state
    }
}