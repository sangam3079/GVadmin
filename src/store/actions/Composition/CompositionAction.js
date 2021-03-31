export const SET_COMPOSITION_DATA = 'SET_COMPOSITION_DATA';
export const SET_COMPOSITION_META = 'SET_COMPOSITION_META';
// export const SET_COMPOSITION = 'SET_COMPOSITION'
// export const NEW_COMPOSITION = 'NEW_COMPOSITION'
// export const DELETE_COMPOSITION = 'DELETE_COMPOSITION'
export const UPDATE_COMPOSITION = 'UPDATE_COMPOSITION'
// export const SET_COMPOSITION_KEYWORD = 'SET_COMPOSITION_KEYWORD'
export const SET_COMPOSITION_CURRENTPAGE = 'SET_COMPOSITION_CURRENTPAGE';


export function setData(payload){
    return{
        type : SET_COMPOSITION_DATA,
        payload
    }
}

export function setMeta(payload){
    console.log("payload")
    return{
        type : SET_COMPOSITION_META,
        payload 
    }
}

// export function addCOMPOSITION(payload){
//     return{
//         type : NEW_COMPOSITION,
//         payload
//     }
// }

// export function COMPOSITIONDelete(id){
//     return{
//         type : DELETE_COMPOSITION,
//         payload : id
//     }
// }

export function compositionUpdate({id, payload}){
    return{
        type : UPDATE_COMPOSITION,
        payload,
        id
    }
}

// export function setCOMPOSITION(payload){
//     return{
//         type : SET_COMPOSITION,
//         payload
//     }
// }

// export function setCOMPOSITIONKeyword(payload){
//     return {
//         type : SET_COMPOSITION_KEYWORD,
//         payload
//     }
// }

export function setCompositionCurrentpage(payload){
    return {
        type : SET_COMPOSITION_CURRENTPAGE,
        payload
    }
}