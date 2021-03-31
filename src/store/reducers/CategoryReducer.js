import * as actions from 'store/actions/Category/CategoryAction'

const initialStore = {
    data : [],
    category : {},
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    keyword : undefined
}

export default function categoryReducer(state = initialStore, action){
    let {payload} = action;
    switch(action.type){
        case actions.SET_CATEGORY_DATA:
            return{
                ...state,
                data : payload
            }
        case actions.SET_CATEGORY_META:
            return{
                ...state,
                total : payload.total,
                totalPage : payload.pages,
                currentPage : payload.page
            }
        case actions.DELETE_CATEGORY:
            let clone = [...state.data];
            let dataWithoutDeleted = clone.filter((category) => category.id !== action.payload)
            return {
                ...state,
                data : dataWithoutDeleted
            } 
        case actions.UPDATE_CATEGORY:
            let updated_data = [];
            state.data.forEach((category, index) => {
                if(category.id === action.id){
                    updated_data = [...state.data];
                    let updated_category = {...updated_data[index]}
                    updated_category = {
                        ...updated_category,
                        ...action.payload
                    }
                    updated_data[index] = updated_category
                }
            })
            return {
                ...state,
                data : updated_data
            }
        case actions.SET_CATEGORY:
            return{
                ...state,
                category : payload
            }
        case actions.NEW_CATEGORY:
            let new_data = [action.payload, ...state.data];
            return {
                ...state,
                data : new_data
            }
        case actions.SET_CATEGORY_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case actions.SET_CATEGORY_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        default:
            return state
    }
}