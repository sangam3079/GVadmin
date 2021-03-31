import {
    getApiCall,
    postApiCall,
    urlWithParams
} from './url';

import {compositionsUrl} from './url';
import {apiEndpoint} from 'services/constants';
import { 
        setData, 
        setMeta, 
        //  compositionDelete, 
        //  addcomposition, 
        compositionUpdate,
        //  setcomposition, 
    } from 'store/actions/Composition/CompositionAction';
import { message } from 'antd';

export const getAllCompositions = obj => {
    let {params, callback} = obj
    let url = urlWithParams(`${apiEndpoint}/${compositionsUrl}`, params);
    return dispatch => {
        getApiCall({url, dispatch})
        .then(resp => {
            if(resp !== 0){
                let {data, page_meta} = resp;
                dispatch(setData(data || []))
                dispatch(setMeta({page : page_meta.current_page, pages : page_meta.total / page_meta.per_page , total : page_meta.total}))
            }else{
                message.error('Could not fetch composition. Something went wrong on server side');
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}


export const updateComposition = ({id,body,callback}) => {
    let url = `${apiEndpoint}/${compositionsUrl}/${id}`;
    return dispatch => {
        postApiCall({dispatch, method : 'PUT', url, body})
        .then(resp => {
            if(resp !== 0){
                console.log(resp);
                dispatch(compositionUpdate({id, payload : body}))
                message.success('Sucessfully updated composition')
            }else{
                message.error('Sorry could not update composition. Something went wrong')
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}