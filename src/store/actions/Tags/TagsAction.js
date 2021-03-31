export const SET_TAGS_DATA = 'SET_TAGS_DATA'
export const SET_TAGS_GROUP_DATA = 'SET_TAGS_GROUP_DATA'
export const SET_TAGS_META = 'SET_TAGS_META'
export const SET_TAGS_GROUP_META = 'SET_TAGS_GROUP_META'
export const SET_A_TAG = 'SET_A_TAG'
export const SET_A_TAG_GROUP = 'SET_A_TAG_GROUP'
export const SET_TAG_KEYWORD = 'SET_TAG_KEYWORD'
export const SET_TAG_CURRENTPAGE = 'SET_TAG_CURRENTPAGE'
export const DELETE_TAG = 'DELETE_TAG'
export const DELETE_TAG_GROUP = 'DELETE_TAG_GROUP'
export const NEW_TAG = 'NEW_TAG'
export const NEW_TAG_GROUP = 'NEW_TAG_GROUP'
export const UPDATE_TAG = 'UPDATE_TAG'
export const UPDATE_TAG_GROUP = 'UPDATE_TAG_GROUP'
export const SET_TAG_GROUP_KEYWORD = 'SET_TAG_GROUP_KEYWORD'
export const SET_TAG_GROUP_CURRENTPAGE = 'SET_TAG_GROUP_CURRENTPAGE'


export function setTagsData(payload){
    return {
        type : SET_TAGS_DATA,
        payload
    }
}

export function setTagsGroupData(payload){
    return {
        type : SET_TAGS_GROUP_DATA,
        payload
    }
}

export function setTagsMeta(payload){
    return {
        type : SET_TAGS_META,
        payload
    }
}

export function setTagsGroupMeta(payload){
    return{
        type : SET_TAGS_GROUP_META,
        payload
    }
}

export function setATag(payload){
    return {
        type : SET_A_TAG,
        payload
    }
}

export function setATagGroup(payload){
    return {
        type : SET_A_TAG_GROUP,
        payload
    }
}

export function tagDelete(id){
    return {
        type : DELETE_TAG,
        payload : id
    }
}

export function tagGroupDelete(id){
    return{
        type : DELETE_TAG_GROUP,
        payload : id
    }
}

export function newTag(payload){
    return{
        type : NEW_TAG,
        payload
    }
}

export function newTagGroup(payload){
    return{
        type : NEW_TAG_GROUP,
        payload
    }
}

export function tagUpdate(payload){
    return{
        type : UPDATE_TAG,
        payload
    }
}

export function tagGroupUpdate(payload){
    return{
        type : UPDATE_TAG_GROUP,
        payload
    }
}

export function setTagKeyword(payload){
    return {
        type : SET_TAG_KEYWORD,
        payload
    }
}

export function setTagCurrentpage(payload){
    return {
        type : SET_TAG_CURRENTPAGE,
        payload
    }
}

export function setTagGroupKeyword(payload){
    return {
        type : SET_TAG_GROUP_KEYWORD,
        payload
    }
}

export function setTagGroupCurrentpage(payload){
    return {
        type : SET_TAG_GROUP_CURRENTPAGE,
        payload
    }
}