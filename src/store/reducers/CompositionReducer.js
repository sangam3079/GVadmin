import * as actions from 'store/actions/Composition/CompositionAction';

const initialStore = {
    data : [],
    composition : {},
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    keyword : undefined
}

export default function compositionReducer(state = initialStore, action){
    let {payload} = action;
    switch(action.type){
        case actions.SET_COMPOSITION_DATA:
            console.log(action);
            return{
                ...state,
                data : payload
            }
        case actions.SET_COMPOSITION_META:
            console.log(action);
            return{
                ...state,
                total : payload.total,
                totalPage : payload.pages,
                currentPage : payload.page
            }
        // case actions.DELETE_COMPOSITION:
        //     let clone = [...state.data];
        //     let dataWithoutDeleted = clone.filter((COMPOSITION) => COMPOSITION.id !== action.payload)
        //     return {
        //         ...state,
        //         data : dataWithoutDeleted
        //     } 
        case actions.UPDATE_COMPOSITION:
            let updated_data = [];
            state.data.forEach((composition, index) => {
                if(composition.id === action.id){
                    updated_data = [...state.data];
                    let updated_composition = {...updated_data[index]}
                    updated_composition = {
                        ...updated_composition,
                        ...action.payload
                    }
                    updated_data[index] = updated_composition
                }
            })
            return {
                ...state,
                data : updated_data
            }
        // case actions.SET_COMPOSITION:
        //     return{
        //         ...state,
        //         COMPOSITION : payload
        //     }
        // case actions.NEW_COMPOSITION:
        //     let new_data = [action.payload, ...state.data];
        //     return {
        //         ...state,
        //         data : new_data
        //     }
        case actions.SET_COMPOSITION_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        // case actions.SET_COMPOSITION_KEYWORD:
        //     return {
        //         ...state,
        //         keyword : action.payload
        //     }
        default:
            return state;
    }
}