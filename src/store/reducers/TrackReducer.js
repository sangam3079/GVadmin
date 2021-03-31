import * as actions from '../actions/Tracks/TrackActions.js';

const initialState = {
    data : [],
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    track : {},
    keyword : undefined
}

export default function trackReducer(state = initialState, action){
    let {payload} = action
    switch(action.type){
        case actions.SET_ALL_TRACKS:
            // console.log('setting tracks');
            return {
                ...state,
                data : action.payload
            }
        case actions.SET_POPULAR_TRACKS:
            return {
                ...state,
                data : action.payload
            }
        case actions.SET_TRACK_META:
            // console.log('setting meta');
            return{
                ...state,
                total : payload.total,
                totalPage : payload.pages,
                currentPage : payload.page
            }
        case actions.DELETE_TRACK:
            // console.log('delete track')
            let cloned_tracks = [...state.data];
            let updated_tracks = cloned_tracks.filter((track) => track.id !== payload);
            return{
                ...state,
                data : updated_tracks
            }
        case actions.UPDATE_TRACK:
            let updated_data = [];
            state.data.forEach((track, index) => {
                if(track.id === action.id){
                    updated_data = [...state.data];
                    let updated_track = {...updated_data[index]}
                    updated_track = {
                        ...updated_track,
                        ...action.payload
                    }
                    updated_data[index] = updated_track
                }
            })
            return{
                ...state,
                data : updated_data
            }
        case actions.SET_TRACK:
            return{
                ...state,
                track : payload
            }
        case actions.NEW_TRACK:
            let new_data = [action.payload, ...state.data];
            return{
                ...state,
                data : new_data
            }
        case actions.SET_TRACK_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case actions.SET_TRACK_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        default:
            return state
    }
}