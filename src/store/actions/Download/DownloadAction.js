export const SET_DOWNLOAD_DATA = 'SET_DOWNLOAD_DATA'
export const SET_DOWNLOAD_META = 'SET_DOWNLOAD_META'
export const SET_DOWNLOAD_KEYWORD = 'SET_DOWNLOAD_KEYWORD'
export const SET_DOWNLOAD_CURRENTPAGE = 'SET_DOWNLOAD_CURRENTPAGE'

export function setDownloadData(payload){
    return{
        type : SET_DOWNLOAD_DATA,
        payload
    }
}

export function setMeta(payload){
    return{
        type : SET_DOWNLOAD_META,
        payload
    }
}

export function setDownloadKeyword(payload){
    return {
        type : SET_DOWNLOAD_KEYWORD,
        payload
    }
}

export function setDownloadCurrentpage(payload){
    return {
        type : SET_DOWNLOAD_CURRENTPAGE,
        payload
    }
}