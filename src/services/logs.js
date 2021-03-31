import {
    getApiCall,
    postApiCall,
    urlWithParams
} from './url'

import {logsUrl} from './url'
import {apiEndpoint} from 'services/constants'
import {setLogData, setMeta, setSubscriptionLogData, setSubscriptionLogMeta} from 'store/actions/Log/LogAction'
import { message } from 'antd'


export const getAlllogs = obj => {
    let {callback, params} = obj
    let durl = urlWithParams(`${apiEndpoint}/${logsUrl}`, params)
    let url = durl + '&filter=generic'
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp !== 0){
                let {data, page_meta}= resp;
                dispatch(setLogData(data))
                dispatch(setMeta({per_page : page_meta.per_page, page : page_meta.currentPage, total:page_meta.total}))
            }else{
                message.error('Could not fetch activity logs. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const getGenericLogs = obj => {
    let {callback, params} = obj;
    let durl = urlWithParams(`${apiEndpoint}/${logsUrl}`, params)
    let url = durl + '&filter=generic'
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp !==0){

            }else{

            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const getSubscriptionLogs = obj => {
    let {callback, params} = obj;
    let durl = urlWithParams(`${apiEndpoint}/${logsUrl}`, params)
    let url = durl + '&filter=subscriptions'
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp !==0){
                let {current_page, total} = resp.page_meta;
                dispatch(setSubscriptionLogData(resp.data))
                dispatch(setSubscriptionLogMeta({page : current_page, total, totalPage : undefined}))
            }else{

            }
        }).catch(err => console.log(err))
        .finally(() => callback())
    }
}