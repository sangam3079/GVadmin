export const SET_PLAYLIST_DATA = 'SET_PLAYLIST_DATA'
export const SET_A_PLAYLIST = 'SET_A_PLAYLIST'
export const SET_PLAYLIST_META = 'SET_PLAYLIST_META'
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST'
export const NEW_PLAYLIST = 'NEW_PLAYLIST'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const SET_PLAYLIST_KEYWORD = 'SET_PLAYLIST_KEYWORD'
export const SET_PLAYLIST_CURRENTPAGE = 'SET_PLAYLIST_CURRENTPAGE'

export function setPlayListData(payload){
    return{
        type : SET_PLAYLIST_DATA,
        payload
    }
}

export function setPlaylistMeta(payload){
    return{
        type : SET_PLAYLIST_META,
        payload
    }
}

export function setAPlaylist(payload){
    return{
        type : SET_A_PLAYLIST,
        payload
    }
}

export function playlistDelete(id){
    return{
        type : DELETE_PLAYLIST,
        payload : id
    }
}

export function addPlaylist(payload){
    return{
        type : NEW_PLAYLIST,
        payload
    }
}

export function playlistUpdate(payload){
    return{
        type : UPDATE_PLAYLIST,
        payload
    }
}

export function setPlaylistKeyword(payload){
    return {
        type : SET_PLAYLIST_KEYWORD,
        payload
    }
}

export function setPlaylistCurrentpage(payload){
    return {
        type : SET_PLAYLIST_CURRENTPAGE,
        payload
    }
}