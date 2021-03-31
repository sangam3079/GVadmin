import {
    getApiCall,
    postApiCall,
    urlWithParams,
    getFileApiCall,
} from './url'

import {subscriptionsUrl} from './url'
import {apiEndpoint} from 'services/constants'
import {setMeta, setSubscriptionData, setSubscription, addSubscription, subscriptionUpdate, setUnSubUsers} from 'store/actions/Subscription/SubscriptionAction'
import {message} from 'antd'

export const getAllSubscription = obj => {
    let {callback, params, prevSearchKeyword} = obj;
    let url = urlWithParams(`${apiEndpoint}/${subscriptionsUrl}`, params)
    return dispatch => {
        if(prevSearchKeyword!==undefined){
            getApiCall({url, dispatch,abort:true})
            .then(resp => {
                if(resp !== 0 && resp !== undefined){
                    let {data, page_meta} = resp;
                    dispatch(setSubscriptionData(data))
                    dispatch(setMeta({page : page_meta.current_page, pages : page_meta.total / page_meta.per_page, total : page_meta.total}))
                }else if(resp===undefined){
                    console.log('[Previous keyword search aborted], getApiCall response:',resp)
                }else{
                    message.error('Could not fetch subscription. Something went wrong on server side');
                }
            })
            .catch(err => console.log(err))
            .finally(() => callback())
        }else if(prevSearchKeyword===undefined){
            getApiCall({url, dispatch, abort:false})
            .then(resp => {
                if(resp !== 0 && resp !== undefined){
                    let {data, page_meta} = resp;
                    dispatch(setSubscriptionData(data))
                    dispatch(setMeta({page : page_meta.current_page, pages : page_meta.total / page_meta.per_page, total : page_meta.total}))
                }else if(resp===undefined){
                    console.log('[Previous keyword search aborted], getApiCall response:',resp)
                }else{
                    message.error('Could not fetch subscription. Something went wrong on server side');
                }
            })
            .catch(err => console.log(err))
            .finally(() => callback())
        }

       
    }
}

export const getSubscription = obj => {
    let {callback, id} = obj;
    let url =  `${apiEndpoint}/${subscriptionsUrl}/${id}`
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp !== 0){
                dispatch(setSubscription(resp))
            }else{
                message.error('Something went wrong on server side');
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const newSubscription = obj => {
    let {callback, body} = obj;
    let url = `${apiEndpoint}/${subscriptionsUrl}`
    return dispatch => {
        postApiCall({dispatch, method : 'POST', url, body})
        .then(resp => {
            if(resp !== 0){
                dispatch(addSubscription(resp))
                message.success('Sucessfully added a subscription');
            }else{
                message.error('Sorry couldnot add a subscription. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const updateSubscription = obj => {
    let {callback, id, body} = obj;
    let url = `${apiEndpoint}/${subscriptionsUrl}/${id}`
    return dispatch => {
        postApiCall({dispatch, method : 'PUT', url, body})
        .then(resp => {
            if(resp !==0){
                dispatch(subscriptionUpdate({id, payload : resp.data}))
                message.success('Sucessfully updated subscription.')
            }else{
                message.error('Sorry couldnot updated subscription. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}

export const getAllUnsubscribedUser = ({params}) => {
    let url = urlWithParams(`${apiEndpoint}/users`, params)
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            dispatch(setUnSubUsers(resp.data))
        })
        .catch(err => console.log(err))
    }
}


export const exportSubscriptionData=(params)=>{
    
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let url = urlWithParams(`${apiEndpoint}/subscriptions.csv`, params);
    url=`${url}export_columns=id,full_name,email`;

    console.log('export url',url);
    return (dispatch)=>{
        getFileApiCall({url,dispatch,date})
        .then(blob=>{
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link =document.createElement('a');
            link.href=url;
            link.setAttribute('download',`subscription-${date}.csv`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(err=>console.log(err))
    }
}