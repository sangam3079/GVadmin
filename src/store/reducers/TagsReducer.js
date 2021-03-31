import * as actions from '../actions/Tags/TagsAction'
const initialState = {
    data : [],
    tag : {},
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    keyword : undefined
}

export default function TagsReducer(state = initialState, action){
    const {payload} = action;
    switch(action.type){
        case actions.SET_TAGS_DATA:
            return{
                ...state,
                data : payload
            }
        case actions.SET_TAGS_META:
            return{
                ...state,
                payload
            }
        case actions.DELETE_TAG:
            const clone = [...state.data];
            const dataWithoutDeleted = clone.filter(tag => tag.id !== payload)
            return{
                ...state,
                data : dataWithoutDeleted
            }
        case actions.UPDATE_TAG:
            let updated_data;
            state.data.forEach((tag, index) => {
                if(tag.id === payload.id){
                    updated_data = [...state.data]
                    let updated_tag = {...updated_data[index]}
                    updated_tag = {
                        ...updated_tag,
                        ...payload
                    }
                    updated_data[index] = updated_tag
                }
            })
            return {
                ...state,
                data : updated_data
            }
        case actions.SET_A_TAG:
            return{
                ...state,
                tag : payload
            }
        case actions.NEW_TAG:
            const new_data = [payload, ...state.data]
            return{
                ...state,
                data : new_data
            }
        case actions.SET_TAG_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case actions.SET_TAG_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        default :
            return state
    }
}