import * as actions from '../actions/Customer/CustomerAction.js'

const initialState = {
    data : [],
    customer : {},
    total : undefined,
    totalPage : undefined,
    currentPage : 1,
    keyword : undefined,
    device : undefined
}

export default function customerReducer(state = initialState, action){
    let {payload} = action
    switch (action.type){
        case actions.SET_ALL_CUSTOMER:
            // console.log('setting customer')
            return {
                ...state,
                data : action.payload
            }
        case actions.SET_CUSTOMER_META:
            // console.log('setting meta');
            return{
                ...state,
                total : payload.total,
                totalPage : payload.pages,
                currentPage : payload.page
            }
        case actions.DELETE_CUSTOMER:
            // console.log('deleted a customer')
            let clone = [...state.data];
            let dataWithoutDeleted = clone.filter((customer) => customer.id !== action.payload)
            return{
                ...state,
                data : dataWithoutDeleted
            }
        case actions.UPDATE_CUSTOMER:
            // console.log('updated a customer');
            let updated_data = [];
            state.data.forEach((customer, index) => {
                if(customer.id === action.id){
                    updated_data = [...state.data];
                    let updated_customer = {...updated_data[index]}
                    updated_customer = {
                        ...updated_customer,
                        ...action.payload
                    }
                    updated_data[index] = updated_customer
                }
            })
            return {
                ...state,
                data : updated_data
            }
        case actions.SET_CUSTOMER:
            // console.log('set a customer');
            return {
                ...state,
                customer : payload
            }
        case actions.NEW_CUSTOMER:
            // console.log('new customer');
            let new_data = [action.payload, ...state.data];
            return {
                ...state,
                data : new_data
            }
        case actions.SET_CUSTOMER_CURRENTPAGE:
            return {
                ...state,
                currentPage : action.payload
            }
        case actions.SET_CUSTOMER_KEYWORD:
            return {
                ...state,
                keyword : action.payload
            }
        case actions.SET_CUSTOMER_DEVICE:
            return {
                ...state,
                device : action.payload
            }    
        default:
            return state
    }
}