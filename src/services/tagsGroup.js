import {
    getApiCall,
    postApiCall
} from './url'

import {tagsGroupUrl, urlWithParams} from './url'
import {apiEndpoint} from 'services/constants'
import { setTagsGroupData, setTagsGroupMeta, tagGroupDelete, newTagGroup, tagGroupUpdate, setATagGroup } from 'store/actions/Tags/TagsAction'
import {message} from 'antd'
import {getPageMetaObject} from 'utils/helpers'

export const getAllTagsGroup = obj => {
    const {callback, params, prevTagsGroupSearch} = obj;
    const url = urlWithParams(`${apiEndpoint}/${tagsGroupUrl}`, params)
    return dispatch => {
        if(prevTagsGroupSearch !== undefined){
            getApiCall({dispatch, url,abort:true})
            .then(resp => {
                if(resp !== 0 && resp!==undefined){
                    const {data, page_meta} = resp;
                    dispatch(setTagsGroupData(data));
                    dispatch(setTagsGroupMeta(getPageMetaObject(page_meta)))
                }else if(resp===undefined){
                    console.log('getApiCall response:',resp)
                }else{
                    message.error('Could not fetch tag groups. Something went wrong');
                }
            })
            .catch(err => console.log(err))
            .finally(()=>{
                if(typeof callback === 'function'){
                    callback();
                }
            })
        }else if(prevTagsGroupSearch === undefined){
            getApiCall({dispatch, url,abort:false})
            .then(resp => {
                if(resp !== 0 && resp!==undefined){
                    const {data, page_meta} = resp;
                    dispatch(setTagsGroupData(data));
                    dispatch(setTagsGroupMeta(getPageMetaObject(page_meta)))
                }else if(resp===undefined){
                    console.log('getApiCall response:',resp)
                }else{
                    message.error('Couldnot fetch tag groups. Something went wrong');
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

export const deleteTagGroup = obj => {
    const {id, callback} = obj;
    const url = `${apiEndpoint}/${tagsGroupUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'DELETE', url})
        .then(resp => {
            if(resp){
                dispatch(tagGroupDelete(id))
                message.success('Successfully deleted a tag')
            }else{
                message.error('Sorry could not delete tag group. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(()=>{
            if(typeof callback === 'function'){
                callback()
            }
        })
    }
}

export const addNewTagGroup = obj => {
    const {body, callback, finalCallback} = obj;
    const url = `${apiEndpoint}/${tagsGroupUrl}`
    return dispatch => {
        postApiCall({dispatch, method : 'POST', url, body})
        .then(resp => {
            if(resp){
                const {data} = resp
                dispatch(newTagGroup(data))
                message.success('Successfully added a tag group')
                callback();
            }else{
                message.error('Sorry couldnt add new tag group. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(()=>finalCallback())
    }
}

export const updateTagGroup = obj => {
    const {id, body, callback, finalCallback} = obj;
    const url = `${apiEndpoint}/${tagsGroupUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'PUT', url, body})
        .then(resp => {
            if(resp){
                dispatch(tagGroupUpdate(resp.data))
                message.success('Successfully updated tag group')
                callback()
            }else{
                message.error('Something went wrong.')
            }
        })
        .catch(err => console.log(err))
        .finally(()=>finalCallback())
    }
}

export const getTagGroup = obj => {
    let {id, callback} = obj;
    let url = `${apiEndpoint}/${tagsGroupUrl}/${id}`
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp){
                dispatch(setATagGroup(resp.data))
            }else{
                message.error('Something went wrong on server side');
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}