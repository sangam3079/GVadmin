import { getApiCall, postApiCall, urlWithParams } from './url';
import { message } from 'antd';


import { userGroupsCampaignUrl } from './url';
import { apiEndpoint } from 'services/constants';
import {
  addNewUserGroupsCampaign,
  setUserGroupsCampaignData,
  setUserGroupsCampaignMeta,
  userGroupsCampaignDelete,
  setUserGroupsCampaign,
  userGroupsCampaignUpdate,
} from 'store/actions/UserCampaign/UserGroupsCampaignAction';

import { customFetch } from 'utils';
import cookie from 'utils/cookie';

const token = cookie.getToken();
const baseUrlCampaign = `${apiEndpoint}/${userGroupsCampaignUrl}`;

/*
export const newUserGroupsCampaign = ({ body, callback, final }) => {
  const url = baseUrlCampaign;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: 'POST',
        url,
        body,
      });

      if (!!response) {
        console.log('campaing created', response);
        dispatch(addNewCampaign(response.data));

        //      callback();
        message.success('Successfully added a campaign');
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback();
    }
  }; 

  // return (dispatch) => {
  //   postApiCall({ dispatch, method: 'POST', url, body })
  //     .then((resp) => {
  //       if (resp !== 0) {
  //         dispatch(addNewCampaign(resp.data));
  //         message.success('Sucessfully added a campaign');
  //       } else {
  //         message.error('Sorry couldnot add a campaign. Something went wrong');
  //       }
  //     })
  //     .catch((err) => console.warn(err))
  //     .finally(() => callback());
  // };
}; */

export const getAllUserGroupsCampaign = (obj) => {
  let { params, callback, prevUserGroupsCampaignKeyword } = obj;
  let url = urlWithParams(baseUrlCampaign, params);

  return (dispatch) => {
    if (prevUserGroupsCampaignKeyword !== undefined) {
      getApiCall({ url, dispatch, abort: true })
        .then((resp) => {
          if (resp !== 0 && resp !== undefined) {
            dispatch(setUserGroupsCampaignData(resp.data));
            dispatch(
              setUserGroupsCampaignMeta({
                page: resp.page_meta.current_page,
                pages: resp.page_meta.totalPage,
                total: resp.page_meta.total,
              })
            );
          } else if (resp === undefined) {
            console.log(
              '[Previous keyword search aborted], getApiCall response:',
              resp
            );
          } else {
            message.error(
              'Could not fetch push notifications. Something went wrong'
            );
          }
        })
        .catch((err) => console.log(err))
        .finally(() => callback());
    } else if (prevUserGroupsCampaignKeyword === undefined) {
      getApiCall({ url, dispatch, abort: false })
        .then((resp) => {
          if (resp !== 0 && resp !== undefined) {
            console.log(resp);
            dispatch(setUserGroupsCampaignData(resp.data));
            dispatch(
              setUserGroupsCampaignMeta({
                page: resp.page_meta.current_page,
                pages: resp.page_meta.totalPage,
                total: resp.page_meta.total,
              })
            );
          } else if (resp === undefined) {
            console.log(
              '[Previous keyword search aborted], getApiCall response:',
              resp
            );
          } else {
            message.error(
              'Could not fetch push notifications. Something went wrong'
            );
          }
        })
        .catch((err) => console.log(err))
        .finally(() => callback());
    }
  };
};
 /*
export const deleteCampaign = ({ id, callback }) => {
  let url = `${apiEndpoint}/${campaignUrl}/${id}`;
  return (dispatch) => {
    postApiCall({ dispatch, method: 'DELETE', url })
      .then((resp) => {
        if (resp !== 0) {
          dispatch(campaignDelete(id));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => callback());
  };
}; */

export const getUserGroupsCampaign = (obj) => {
  let { id, callback } = obj;
  let url = `${apiEndpoint}/${userGroupsCampaignUrl}/${id}`;
  return (dispatch) => {
    getApiCall({ url, dispatch })
      .then((resp) => {
        if (resp !== 0) {
            console.log(resp.data);
          dispatch(setUserGroupsCampaign(resp.data));
        } else {
          message.error('Something went wrong on server side');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => callback());
  };
};
 /*
export const updateCampaign = ({ id, body, callback }) => {
  let url = `${apiEndpoint}/${campaignUrl}/${id}`;
  //   let url = `https://api-stage.goodvibesofficial.com:4443/admin/v2/campaigns/64`;
  console.log(url);
  console.log('This update dispatch is working');
  console.log(body);
  //   const config = {
  //     headers: {
  //       'Content-Type':
  //         'multipart/form-data; boundary=<calculated when request is sent>',
  //     },
  //   };
  return (dispatch) => {
    postApiCall({ dispatch, method: 'PUT', url, body })
      .then((resp) => {
        console.log('campaign response data', resp);
        if (resp !== 0) {
          dispatch(campaignUpdate({ id, payload: resp.data }));
        } else {
          // message.error('Sorry couldnot update notification. Something went wrong')
        }
      })
      .catch((err) => console.log(err))
      .finally(() => callback());
  };
};  */

// export const fetchTemplatePreview= async (id)=>{

//     let response_data;

//     response_data = await customFetch(`admin/v2/campaigns/${id}/preview`, 'GET',{filters : {keyword :''}},{ Authorization: `Bearer ${token}` })
//     console.log('response_data', response_data);
//     if(response_data){
//         setModalPreviewData(response_data[0]);
//
//         setModalDataLoading(false);
//     return response_data;
//     }
// }