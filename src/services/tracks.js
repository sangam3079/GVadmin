import {
    getApiCall,
    postApiCall,
} from './url'

import {tracksUrl, popularTracksUrl, urlWithParams} from './url'
import {apiEndpoint} from 'services/constants'
import {setData, setPopularTracks, setMeta, setTrack, trackDelete, addTrack, trackUpdate} from 'store/actions/Tracks/TrackActions'
import {message} from 'antd'

export const getAllTracks = (obj) => {
  let {callback, params, prevSearchKeyword} = obj;
  let url = urlWithParams(`${apiEndpoint}/${tracksUrl}`, params)
  return dispatch => {
    if(prevSearchKeyword !== undefined){
      getApiCall({dispatch, url,abort:true})
      .then(resp => {
        if(resp !== 0 && resp!==undefined ){
          let {data, page_meta} = resp
          // console.log(data)
          dispatch(setData(data))
          dispatch(setMeta({page : page_meta.current_page, total : page_meta.total, pages : page_meta.total/page_meta.per_page}))
        }else if(resp===undefined){
          console.log('[Previous keyword search aborted], getApiCall response:',resp)
        }else{
          message.error('Could not fetch track. Something went wrong on server side');
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        callback()
      })
    }else if(prevSearchKeyword === undefined){
      getApiCall({dispatch, url,abort:false})
      .then(resp => {
        if(resp !== 0 && resp!==undefined ){
          let {data, page_meta} = resp
          
          dispatch(setData(data))
          dispatch(setMeta({page : page_meta.current_page, total : page_meta.total, pages : page_meta.total/page_meta.per_page}))
        }else if(resp===undefined){
          console.log('[Previous keyword search aborted], getApiCall response:',resp)
        }else{
          message.error('Could not fetch track. Something went wrong on server side');
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        callback()
      })
    }
  }
}

export const getPopularTracks = (obj) => {
  let {callback, params} = obj;
  let url = urlWithParams(`${apiEndpoint}/${popularTracksUrl}`, params)
  return dispatch => {
    getApiCall({dispatch, url})
    .then(resp => {
      if(resp !== 0){
        let {data, page_meta} = resp;
        dispatch(setPopularTracks(data));
        dispatch(setMeta({page : page_meta.current_page, total : page_meta.total, pages : page_meta.total/page_meta.per_page}));
      }else{
        message.error('Could not fetch track. Something went wrong on server side');
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      callback()
    })
  }
}


export const deleteTrack = ({id, callback}) => {
  let url = `${apiEndpoint}/${tracksUrl}/${id}`;
  return dispatch => {
    postApiCall({dispatch, method : 'DELETE', url})
    .then( resp => {
      if(resp){
        dispatch(trackDelete(id))
        message.success('Sucessfully deleted a track')
      }else{
        message.error('Sorry could not delete track. Something went wrong')
      }
    })
    .catch(err => console.log(err))
    .finally(()=>callback())
  }
}

export const newTrack = ({body, successCallback, callback}) => {
  let url = `${apiEndpoint}/${tracksUrl}`;
  return dispatch => {
    postApiCall({dispatch, method : 'POST', url , body})
    .then (res => {
      if(res){
        message.success('Sucessfully added a track');
        dispatch(addTrack(res.data))
        successCallback();
      }else{
        message.error('Sorry couldnot add a track. Something went wrong')
      }
    })
    .catch (err => console.log(err))
    .finally(() => callback())
  }
}

export const updateTrack = ({id, body, callback, successCallback}) => {
  let url = `${apiEndpoint}/${tracksUrl}/${id}`
  return dispatch => {
    postApiCall({dispatch, method : 'PUT', url, body})
    .then(resp => {
      if(resp){
        dispatch(trackUpdate({id, payload : body}))
        message.success('Sucessfully updated track.')
        successCallback()
      }else{
        message.error('Sorry couldnot updated track. Something went wrong')
      }
    })
    .catch(err => console.log(err))
    .finally(()=>callback())
  }
}

export const getTrack = (obj) => {
  let {id, callback} = obj;
  let url = `${apiEndpoint}/${tracksUrl}/${id}`
  return dispatch => {
    getApiCall({dispatch, url})
    .then(resp => {
      if(resp !==0){
        dispatch(setTrack(resp.data))
      }else{
        message.error('Something went wrong on server side')
      }
    })
    .catch(err => console.log(err))
    .finally(() => callback())
  }
}

// export const urlWithParams = (url, params) => {
//   let {per_page, page, filter, sort} = params;
//   let plainUrl = url;
//   let urlWithParams;
  
//   if(!params){
//     return plainUrl + '?per_page=10&page=1'
//   }else{
//     urlWithParams = plainUrl + '?'
//   }

//   if(per_page){
//     urlWithParams = `${urlWithParams}per_page=${per_page}&`
//   }else{
//     urlWithParams = `${urlWithParams}per_page=10&`
//   }

//   if(page){
//     urlWithParams = `${urlWithParams}page=${page}&`
//   }else{
//     urlWithParams = `${urlWithParams}page=1`
//   }

//   if(filter){
//     urlWithParams = `${urlWithParams}filter=${filter}&`
//   }

//   if(sort){
//     urlWithParams = `${urlWithParams}sort=${sort}&`
//   }

//   return urlWithParams

// }