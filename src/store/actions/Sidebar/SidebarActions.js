export const SET_COLLAPSED = 'SET_COLLAPSED';
export const SET_MOBILE_VIEW = 'SET_MOBILE_VIEW';
export const SET_MOBILE_DRAWER = 'SET_MOBILE_DRAWER'

export function setCollapsed(collapsed){
    return {
        type : SET_COLLAPSED,
        payload : collapsed
    }
}

export function setMobileView(mobileView){
    return {
        type : SET_MOBILE_VIEW,
        payload : mobileView
    }
}

export function setMobileDrawer(drawer){
    return{
        type : SET_MOBILE_DRAWER,
        payload : drawer
    }
}