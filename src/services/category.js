import {
    getApiCall,
    postApiCall,
    urlWithParams
} from './url'

import {categoriesUrl} from './url'
import {apiEndpoint} from 'services/constants'
import { setData, setMeta, categoryDelete, addCategory, categoryUpdate, setCategory } from 'store/actions/Category/CategoryAction'
import { message } from 'antd'

export const getAllCategories = obj => {
    let {params, callback,prevSearchKeyword} = obj
    let url = urlWithParams(`${apiEndpoint}/${categoriesUrl}`, params);
    return dispatch => {
        if(prevSearchKeyword !== undefined){
            getApiCall({url, dispatch,abort:true})
            .then(resp => {
                if(resp !== 0 && resp!==undefined){
                    let {data, page_meta} = resp;
                    dispatch(setData(data || []))
                    dispatch(setMeta({page : page_meta.current_page, pages : page_meta.total / page_meta.per_page , total : page_meta.total}))
                }else if(resp===undefined){
                    console.log('getApiCall response:',resp)
                }else{
                    message.error('Could not fetch category. Something went wrong on server side');
                }
            })
            .catch(err => console.log(err))
            .finally(() => callback())
        }else if(prevSearchKeyword === undefined){
            getApiCall({url, dispatch,abort:false})
            .then(resp => {
                if(resp !== 0 && resp!==undefined){
                    let {data, page_meta} = resp;
                    dispatch(setData(data || []))
                    dispatch(setMeta({page : page_meta.current_page, pages : page_meta.total / page_meta.per_page , total : page_meta.total}))
                }else if(resp===undefined){
                    console.log('getApiCall response:',resp)
                }else{
                    message.error('Could not fetch category. Something went wrong on server side');
                }
            })
            .catch(err => console.log(err))
            .finally(() => callback())
        }

    }
}

export const getCategory = obj => {
    let {id, callback} = obj;
    let url = `${apiEndpoint}/${categoriesUrl}/${id}`
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp !== 0){
                dispatch(setCategory(resp.data))
            }else{
                message.error('Something went wrong on server side');
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const deleteCategory = ({id, callback}) => {
    let url = `${apiEndpoint}/${categoriesUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'DELETE', url})
        .then(resp => {
            if(resp !== 0){
                // console.log('inside then block');
                dispatch(categoryDelete(id))
                message.success('Successfully deleted a category')
            }else{
                message.error('Sorry could not delete category. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const newCategory = ({body , callback}) => {
    let url = `${apiEndpoint}/${categoriesUrl}`
    return dispatch => {
        postApiCall({dispatch, method : 'POST', url, body})
        .then(resp => {
            if(resp !== 0){
                dispatch(addCategory(resp))
                message.success('Successfully added a category');
            }else{
                message.error('Sorry couldnot add a category. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const updateCategory = ({id, body, callback}) =>{
    let url = `${apiEndpoint}/${categoriesUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'PUT', url , body})
        .then(resp => {
            if(resp !== 0){
                dispatch(categoryUpdate({id, payload : body}))
                message.success('Successfully updated category.')
            }else{
                message.error('Sorry couldnot update category. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}