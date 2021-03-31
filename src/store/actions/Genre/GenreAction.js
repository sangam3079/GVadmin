export const SET_GENRE_DATA = 'SET_DATA'
export const SET_A_GENRE = 'SET_A_GENRE'
export const SET_GENRE_META = 'SET_GENRE_META'
export const DELETE_GENRE = "DELETE_GENRE"
export const NEW_GENRE = 'NEW_GENRE'
export const UPDATE_GENRE = 'UPDATE_GENRE'
export const SET_GENRE_KEYWORD = 'SET_GENRE_KEYWORD'
export const SET_GENRE_CURRENTPAGE = 'SET_GENRE_CURRENTPAGE'

export function setGenreData(payload){
    return{
        type : SET_GENRE_DATA,
        payload
    }
}

export function setMeta(payload){
    return{
        type : SET_GENRE_META,
        payload
    }
}

export function genreDelete(id){
    return{
        type : DELETE_GENRE,
        payload : id
    }
}

export function setAGenre(payload){
    return{
        type : SET_A_GENRE,
        payload
    }
}

export function addGenre(payload){
    return{
        type : NEW_GENRE,
        payload
    }
}

export function genreUpdate(payload){
    return{
        type : UPDATE_GENRE,
        payload
    }
}

export function setGenreKeyword(payload){
    return {
        type : SET_GENRE_KEYWORD,
        payload
    }
}

export function setGenreCurrentpage(payload){
    return {
        type : SET_GENRE_CURRENTPAGE,
        payload
    }
}