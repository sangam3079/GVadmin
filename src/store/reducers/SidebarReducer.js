import * as actions from '../actions/Sidebar/SidebarActions'

const initialState = {
    isCollapsed : false,
    isMobileView : false,
    isMobileDrawerOpen : false,
}



export default function sidebarReducer(state = initialState, action){
    switch (action.type){
        case actions.SET_COLLAPSED :
            return{
                ...state,
                isCollapsed : action.payload
            }
        case actions.SET_MOBILE_VIEW : 
            return{
                ...state,
                isMobileView : action.payload
            }
        case actions.SET_MOBILE_DRAWER :
            return{
                ...state,
                isMobileDrawerOpen : action.payload
            }
        default:
            return state
    }
}