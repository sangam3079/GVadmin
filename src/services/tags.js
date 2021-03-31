import {
    getApiCall,
    postApiCall
} from './url'

import {tagsUrl, urlWithParams} from './url'
import {apiEndpoint} from 'services/constants'
import {setTagsData, setTagsMeta, tagDelete, newTag, tagUpdate, setATag} from 'store/actions/Tags/TagsAction'
import {message} from 'antd'
import {getPageMetaObject} from 'utils/helpers'

export const getAllTags = obj => {
    const {callback, params,prevTagSearchKeyword} = obj
    const url = urlWithParams(`${apiEndpoint}/${tagsUrl}`, params)
    return dispatch => {
        if(prevTagSearchKeyword !== undefined){
            getApiCall({dispatch, url,abort:true})
            .then(resp => {
                if(resp !== 0 && resp!==undefined ){
                    const {data, page_meta} = resp;
                    // console.log(data, page_meta);
                    dispatch(setTagsData(data))
                    // dispatch(setTagsMeta({page : page_meta.current_page, total : page_meta.total, pages : page_meta.total/page_meta.per_page}))
                    dispatch(setTagsMeta(getPageMetaObject(page_meta)))
                }else if(resp===undefined){
                    console.log('[Previous keyword search aborted], getApiCall response:',resp)
                }else{
                    message.error('could not fetch tags. Something went wrong');
                }
            })
            .catch(err => console.log(err))
            .finally(()=>{
                if(typeof callback === 'function'){
                    callback();
                }
            })
        }else if(prevTagSearchKeyword === undefined){
            getApiCall({dispatch, url,abort:false})
            .then(resp => {
                if(resp !== 0 && resp!==undefined ){
                    const {data, page_meta} = resp;
                    // console.log(data, page_meta);
                    dispatch(setTagsData(data))
                    // dispatch(setTagsMeta({page : page_meta.current_page, total : page_meta.total, pages : page_meta.total/page_meta.per_page}))
                    dispatch(setTagsMeta(getPageMetaObject(page_meta)))
                }else if(resp===undefined){
                    console.log('[Previous keyword search aborted], getApiCall response:',resp)
                }else{
                    message.error('could not fetch tags. Something went wrong');
                }
            })
            .catch(err => console.log(err))
            .finally(()=>{
                if(typeof callback === 'function'){
                    callback();
                }
            })
        }

        
    }
}

export const deleteTag = obj => {
    const {id, callback} = obj;
    const url = `${apiEndpoint}/${tagsUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'DELETE', url})
        .then(resp => {
            if(resp){
                dispatch(tagDelete(id))
                message.success('Successfully delete a tag')
            }else{
                message.error('Sorry could not delete tag. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => {
            if(typeof callback === 'function'){
                callback()
            }
        })
    }
}

export const addNewTag = obj => {
    const {body, callback, finalCallback} = obj;
    const url = `${apiEndpoint}/${tagsUrl}`
    return dispatch => {
        postApiCall({dispatch, method : 'POST', url, body})
        .then(resp => {
            if(resp){
                const {data} = resp
                dispatch(newTag(data))
                message.success('Successfully added a tag')
                callback();
            }else{
                message.error('Sorry couldnt add new tag. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(()=>finalCallback())
    }
}

export const updateTag = obj => {
    const {id, body, callback, finalCallback} = obj;
    const url = `${apiEndpoint}/${tagsUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'PUT', url, body})
        .then(resp => {
            if(resp){
                dispatch(tagUpdate(resp.data))
                message.success('Successfully updated tag')
                callback()
            }else{
                message.error('Something went wrong.')
            }
        })
        .catch(err => console.log(err))
        .finally(()=>finalCallback())
    }
}

export const getTag = obj => {
    let {id, callback} = obj;
    let url = `${apiEndpoint}/${tagsUrl}/${id}`
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp){
                dispatch(setATag(resp.data))
            }else{
                message.error('Something went wrong on server side');
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}