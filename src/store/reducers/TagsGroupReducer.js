import * as actions from '../actions/Tags/TagsAction'
const initialState = {
    data : [],
    tagGroup : {},
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    keyword : undefined
}

export default function TagsReducer(state = initialState, action){
    const {payload} = action;
    switch(action.type){
        case actions.SET_TAGS_GROUP_DATA:
            return{
                ...state,
                data : payload
            }
        case actions.SET_TAGS_GROUP_META:
            return{
                ...state,
                payload
            }
        case actions.DELETE_TAG_GROUP:
            const clone = [...state.data];
            const dataWithoutDeleted = clone.filter(tag => tag.id !== payload)
            return{
                ...state,
                data : dataWithoutDeleted
            }
        case actions.UPDATE_TAG_GROUP:
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
        case actions.SET_A_TAG_GROUP:
            return{
                ...state,
                tagGroup : payload
            }
        case actions.NEW_TAG_GROUP:
            const new_data = [payload, ...state.data]
            return{
                ...state,
                data : new_data
            }
        case actions.SET_TAG_GROUP_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case actions.SET_TAG_GROUP_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        default :
            return state
    }
}