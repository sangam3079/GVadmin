import {
    getApiCall,
    postApiCall,
    urlWithParams,
    getFileApiCall,
} from './url'

import {customerUrl} from './url'
import {apiEndpoint} from 'services/constants'
import {setData, setMeta, customerDelete, customerUpdate, setCustomer, addCustomer} from 'store/actions/Customer/CustomerAction'
import { message } from 'antd'

export const getAllCustomer = (obj) => {
    let {callback, params, prevSearchKeyword} = obj;
    let url = urlWithParams(`${apiEndpoint}/${customerUrl}`, params);

    return dispatch => {
        if(prevSearchKeyword !== undefined){
            getApiCall({url, dispatch,abort:true})
            .then(resp => {
                if(resp !== 0 && resp!==undefined ){
                    let {data, page_meta} = resp;
                    dispatch(setData(data))
                    dispatch(setMeta({page : page_meta.current_page, pages : page_meta.total / page_meta.per_page, total : page_meta.total}))
                }else if(resp===undefined){
                    console.log('getAllCustomers response:',resp)
                }else{
                    message.error('Could not fetch customers. Something went wrong')
                }
            })
            .catch(err => console.log(err))
            .finally(() => callback())
        }else if(prevSearchKeyword === undefined){
            getApiCall({url, dispatch, abort:false})
            .then(resp => {
                if(resp !== 0 && resp!==undefined ){
                    let {data, page_meta} = resp;
                    dispatch(setData(data))
                    dispatch(setMeta({page : page_meta.current_page, pages : page_meta.total / page_meta.per_page, total : page_meta.total}))
                }else if(resp===undefined){
                    console.log('getAllCustomers response:',resp)
                }else{
                    message.error('Could not fetch customers. Something went wrong')
                }
            })
            .catch(err => console.log(err))
            .finally(() => callback())
        }


    }
}

export const getAllActiveCustomer = (obj) => {
    const {callback, params} = obj
    const url = urlWithParams(`${apiEndpoint}/${customerUrl}/active`, params)
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            callback(resp)
        })
        .catch(err => console.log(err))
    }
}

export const getCustomer = (obj) => {
    let {id, callback} = obj;
    let url = `${apiEndpoint}/${customerUrl}/${id}`
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp !== 0){
                dispatch(setCustomer(resp));
            }else{
                message.error('Something went wrong on server side')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback());
    }
}

export const deleteCustomer = ({id, callback}) => {
    let url = `${apiEndpoint}/${customerUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'DELETE', url})
        .then(resp => {
            if(resp !== 0){
                dispatch(customerDelete(id))
                message.success('Successfully deleted customer')
            }else{
                message.error('Sorry could not delete customer. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const newCustomer = ({body, callback}) => {
    let url = `${apiEndpoint}/${customerUrl}`;
    return dispatch => {
        postApiCall({dispatch, method : 'POST', url, body})
        .then(resp => {
            if(resp !== 0){
                dispatch(addCustomer(resp.data.user));
                message.success('Successfully added a customer')
            }else{
                message.error('Sorry could not add a customer. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const updateCustomer = ({id, body, callback}) => {
    let url = `${apiEndpoint}/${customerUrl}/${id}`
    return dispatch => {
        console.log(body);
        postApiCall({dispatch, method : 'PUT', url, body})
        .then(resp => {
            if(resp !== 0){
                dispatch(customerUpdate({id, payload : body}))
                message.success('Sucessfully updated customer')
            }else{
                message.error('Sorry could not update customer. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const toggleCustomerActiveStatus = ({id, body}) => {
    let url = `${apiEndpoint}/${customerUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'PUT', url, body})
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }
}

export const exportCustomerData=(params)=>{
    
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let url = urlWithParams(`${apiEndpoint}/users.csv`, params);
    url=`${url}export_columns=full_name,email,id`;

    console.log('export url',url);
    return (dispatch)=>{
        getFileApiCall({url,dispatch,date})
        .then(blob=>{
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link =document.createElement('a');
            link.href=url;
            link.setAttribute('download',`users-${date}.csv`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(err=>console.log(err))
    }
}