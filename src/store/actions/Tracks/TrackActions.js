export const SET_ALL_TRACKS = 'SET_ALL_TRACKS';
export const SET_POPULAR_TRACKS = 'SET_POPULAR_TRACKS';
export const SET_TRACK_META = 'SET_TRACK_META'
export const DELETE_TRACK = 'DELETE_TRACK'
export const UPDATE_TRACK = 'UPDATE_TRACK'
export const SET_TRACK = 'SET_TRACK'
export const NEW_TRACK = 'NEW_TRACK'
export const SET_TRACK_KEYWORD = 'SET_TRACK_KEYWORD'
export const SET_TRACK_CURRENTPAGE = 'SET_TRACK_CURRENTPAGE'

export function setData(payload){
    return{
        type : SET_ALL_TRACKS,
        payload
    }
}

export function setPopularTracks(payload){
    return{
        type : SET_POPULAR_TRACKS,
        payload
    }
}

export function setMeta(payload){
    return {
        type : SET_TRACK_META,
        payload
    }
}

export function trackDelete(id){
    return{
        type : DELETE_TRACK,
        payload : id
    }
}

export function trackUpdate({id, payload}){
    return {
        type : UPDATE_TRACK,
        payload,
        id
    }
}

export function addTrack(payload){
    return{
        type : NEW_TRACK,
        payload
    }
}

export function setTrack(payload){
    return{
        type : SET_TRACK,
        payload
    }
}

export function setTrackKeyword(payload){
    return {
        type : SET_TRACK_KEYWORD,
        payload
    }
}

export function setTrackCurrentpage(payload){
    return {
        type : SET_TRACK_CURRENTPAGE,
        payload
    }
}