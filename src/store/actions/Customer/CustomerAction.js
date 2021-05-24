export const SET_ALL_CUSTOMER = 'SET_ALL_CUSTOMER'
export const SET_CUSTOMER_META = 'SET_CUSTOMER_META'
export const SET_CUSTOMER = 'SET_CUSTOMER'
export const NEW_CUSTOMER = 'NEW_CUSTOMER'
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER'
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'
export const SET_CUSTOMER_KEYWORD = 'SET_CUSTOMER_KEYWORD'
export const SET_CUSTOMER_DEVICE = 'SET_CUSTOMER_DEVICE'
export const SET_CUSTOMER_CURRENTPAGE = 'SET_CUSTOMER_CURRENTPAGE'

export function setData(payload){
    return{
        type : SET_ALL_CUSTOMER,
        payload
    }
}

export function setMeta(payload){
    return{
        type : SET_CUSTOMER_META,
        payload
    }
}

export function addCustomer(payload){
    return{
        type : NEW_CUSTOMER,
        payload
    }
}

export function customerDelete(id){
    return{
        type : DELETE_CUSTOMER,
        payload : id
    }
}

export function customerUpdate({id, payload}){
    return{
        type : UPDATE_CUSTOMER,
        payload,
        id
    }
}

export function setCustomer(payload){
    return{
        type : SET_CUSTOMER,
        payload
    }
}

export function setCustomerKeyword(payload){
    return {
        type : SET_CUSTOMER_KEYWORD,
        payload
    }
}

export function setCustomerCurrentpage(payload){
    return {
        type : SET_CUSTOMER_CURRENTPAGE,
        payload
    }
}

export function setCustomerDevice(payload){
    return {
        type : SET_CUSTOMER_DEVICE,
        payload
    }
}