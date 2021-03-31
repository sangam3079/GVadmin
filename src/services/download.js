import {
    getApiCall,
    postApiCall,
    urlWithParams
} from './url'

import {downloadsUrl} from './url'
import {apiEndpoint} from 'services/constants'
import {setDownloadData, setMeta} from 'store/actions/Download/DownloadAction' 
import { message } from 'antd'

export const getAllDownload = obj => {
    let {params, callback, prevDownloadKeyword} = obj
    let url = urlWithParams(`${apiEndpoint}/${downloadsUrl}`, params)
    return dispatch => {
        if(prevDownloadKeyword!==undefined){
            getApiCall({url, dispatch, abort:true})
            .then(resp =>{
                if(resp !== 0 && resp!==undefined){
                    // console.log(resp);
                    dispatch(setDownloadData(resp.data))
                    dispatch(setMeta({page : resp.page_meta.current_page, pages : resp.page_meta.total / resp.page_meta.per_page, total : resp.page_meta.total}))
                }
                else if(resp===undefined){
                    console.log('[Previous keyword search aborted], getApiCall response:',resp)
                }else{
                    message.error('Couldnot fetch download. Something went wrong')
                }
            })
            .catch(err => console.log(err))
            .finally(() => callback())
        }else if( prevDownloadKeyword==undefined){
            getApiCall({url, dispatch, abort:false})
            .then(resp =>{
                if(resp !== 0 && resp!==undefined){
                    // console.log(resp);
                    dispatch(setDownloadData(resp.data))
                    dispatch(setMeta({page : resp.page_meta.current_page, pages : resp.page_meta.total / resp.page_meta.per_page, total : resp.page_meta.total}))
                }else if(resp===undefined){
                    console.log('[Previous keyword search aborted], getApiCall response:',resp)
                }else{
                    message.error('Couldnot fetch download. Something went wrong')
                }
            })
            .catch(err => console.log(err))
            .finally(() => callback())
        }

        
    }
}