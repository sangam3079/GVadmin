export const ADD_NEW_USERGROUPSCAMPAIGN = 'ADD_NEW_USERGROUPSCAMPAIGN'
export const SET_USERGROUPSCAMPAIGN_DATA = 'SET_USERGROUPSCAMPAIGN_DATA'
export const SET_USERGROUPSCAMPAIGN_META = 'SET_USERGROUPSCAMPAIGN_META'
export const SET_USERGROUPSCAMPAIGN = 'SET_USERGROUPSCAMPAIGN'
export const SET_USERGROUPSCAMPAIGN_CURRENTPAGE = 'SET_USERGROUPSCAMPAIGN_CURRENTPAGE'
export const DELETE_USERGROUPSCAMPAIGN = 'DELETE_USERGROUPSCAMPAIGN'
export const SET_USERGROUPSCAMPAIGN_KEYWORD = 'SET_USERGROUPSCAMPAIGN_KEYWORD'
export const UPDATE_USERGROUPSCAMPAIGN = 'UPDATE_USERGROUPSCAMPAIGN'



export function addNewUserGroupsCampaign(payload){
    return{
        type : ADD_NEW_USERGROUPSCAMPAIGN,
        payload
    }
}
export function setUserGroupsCampaignData(payload){
    return{
        type : SET_USERGROUPSCAMPAIGN_DATA,
        payload
    }
}

export function setUserGroupsCampaignMeta(payload){
    return{
        type : SET_USERGROUPSCAMPAIGN_META,
        payload 
    }
}

export function setUserGroupsCampaign(payload){
    return{
        type : SET_USERGROUPSCAMPAIGN,
        payload
    }
}

export function setUserGroupsCampaignCurrentpage(payload){
    console.log(payload);
    return {
        type : SET_USERGROUPSCAMPAIGN_CURRENTPAGE,
        payload
    }
}

export function userGroupsCampaignDelete(id){
    
    return{
        type : DELETE_USERGROUPSCAMPAIGN,
        payload : id
    }
}

export function setUserGroupsCampaignKeyword(payload){
    return {
        type : SET_USERGROUPSCAMPAIGN_KEYWORD,
        payload
    }
}

export function userGroupsCampaignUpdate({id, payload}){
    return{
        type : UPDATE_USERGROUPSCAMPAIGN,
        payload,
        id
    }
}

