export const SET_CATEGORY_DATA = 'SET_CATEGORY_DATA'
export const SET_CATEGORY_META = 'SET_CATEGORY_META'
export const SET_CATEGORY = 'SET_CATEGORY'
export const NEW_CATEGORY = 'NEW_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const SET_CATEGORY_KEYWORD = 'SET_CATEGORY_KEYWORD'
export const SET_CATEGORY_CURRENTPAGE = 'SET_CATEGORY_CURRENTPAGE'


export function setData(payload){
    return{
        type : SET_CATEGORY_DATA,
        payload
    }
}

export function setMeta(payload){
    return{
        type : SET_CATEGORY_META,
        payload 
    }
}

export function addCategory(payload){
    return{
        type : NEW_CATEGORY,
        payload
    }
}

export function categoryDelete(id){
    return{
        type : DELETE_CATEGORY,
        payload : id
    }
}

export function categoryUpdate({id, payload}){
    return{
        type : UPDATE_CATEGORY,
        payload,
        id
    }
}

export function setCategory(payload){
    return{
        type : SET_CATEGORY,
        payload
    }
}

export function setCategoryKeyword(payload){
    return {
        type : SET_CATEGORY_KEYWORD,
        payload
    }
}

export function setCategoryCurrentpage(payload){
    return {
        type : SET_CATEGORY_CURRENTPAGE,
        payload
    }
}