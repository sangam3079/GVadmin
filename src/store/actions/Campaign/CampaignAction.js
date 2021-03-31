export const ADD_NEW_CAMPAIGN = 'ADD_NEW_CAMPAIGN'
export const SET_CAMPAIGN_DATA = 'SET_CAMPAIGN_DATA'
export const SET_CAMPAIGN_META = 'SET_CAMPAIGN_META'
export const SET_CAMPAIGN = 'SET_CAMPAIGN'
export const SET_CAMPAIGN_CURRENTPAGE = 'SET_CAMPAIGN_CURRENTPAGE'
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN'
export const SET_CAMPAIGN_KEYWORD = 'SET_CAMPAIGN_KEYWORD'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'


// export const NEW_PLAYLIST = 'NEW_PLAYLIST'
// export const SET_PLAYLIST_KEYWORD = 'SET_PLAYLIST_KEYWORD'
// export const SET_PLAYLIST_CURRENTPAGE = 'SET_PLAYLIST_CURRENTPAGE'

export function addNewCampaign(payload){
    return{
        type : ADD_NEW_CAMPAIGN,
        payload
    }
}

export function setCampaignData(payload){
    return{
        type : SET_CAMPAIGN_DATA,
        payload
    }
}

export function setCampaignMeta(payload){
    return{
        type : SET_CAMPAIGN_META,
        payload 
    }
}

export function setCampaign(payload){
    return{
        type : SET_CAMPAIGN,
        payload
    }
}

export function setCampaignCurrentpage(payload){
    console.log(payload);
    return {
        type : SET_CAMPAIGN_CURRENTPAGE,
        payload
    }
}

export function campaignDelete(id){
    
    return{
        type : DELETE_CAMPAIGN,
        payload : id
    }
}

export function setCampaignKeyword(payload){
    return {
        type : SET_CAMPAIGN_KEYWORD,
        payload
    }
}

export function campaignUpdate({id, payload}){
    return{
        type : UPDATE_CAMPAIGN,
        payload,
        id
    }
}
