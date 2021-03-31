import * as actions from '../actions/Genre/GenreAction'
const initialState = {
    data : [],
    genre : {},
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    keyword : undefined
}

export default function genreReducer(state = initialState, action){
    let {payload} = action;
    switch(action.type){
        case actions.SET_GENRE_DATA:
            return{
                ...state,
                data : action.payload
            }
        case actions.SET_GENRE_META:
            return{
                ...state,
                total : payload.total,
                totalPage : payload.pages,
                currentPage : payload.page
            }
        case actions.DELETE_GENRE:
            let clone = [...state.data];
            let dataWithoutDeleted = clone.filter((genre) => genre.id !== action.payload)
            return{
                ...state,
                data : dataWithoutDeleted
            }
        case actions.UPDATE_GENRE:
            let updated_data = [];
            state.data.forEach((genre, index) => {
                if(genre.id === action.id){
                    updated_data = [...state.data]
                    let updated_genre = {...updated_data[index]}
                    updated_genre = {
                        ...updated_genre,
                        ...action.payload
                    }
                    updated_data[index] = updated_genre
                }
            })
            return{
                ...state,
                data : updated_data
            }
        case actions.SET_A_GENRE:
            return{
                ...state,
                genre : payload
            }
        case actions.NEW_GENRE:
            let new_data = [action.payload, ...state.data];
            return{
                data : new_data
            }
        case actions.SET_GENRE_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case actions.SET_GENRE_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        default :
            return state
    }
}