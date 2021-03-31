import { getApiCall, urlWithParams } from "./url";

import { invitationsUrl } from "./url";
import { apiEndpoint } from "services/constants";
import {
  setMeta,
  setInvitationsData,
} from "store/actions/Invitations/InvitationsAction";
import { message } from "antd";

export const getAllInvitations = (obj) => {
  let { callback, params, prevInvitationKeyword} = obj;
  let url = urlWithParams(`${apiEndpoint}/${invitationsUrl}`, params);
  return (dispatch) => {
    if(prevInvitationKeyword!==undefined){
        getApiCall({ url, dispatch, abort:true })
        .then((resp) => {
          if (resp !== 0 && resp!==undefined) {
            let { data, page_meta } = resp;
            dispatch(setInvitationsData(data));
            dispatch(
              setMeta({
                page: page_meta.current_page,
                pages: page_meta.total / page_meta.per_page,
                total: page_meta.total,
              })
            );
          }else if(resp===undefined){
            console.log('[Previous keyword search aborted], getApiCall response:',resp)
          } else {
            message.error(
              "Could not fetch invitations. Something went wrong on server side"
            );
          }
        })
        .catch((err) => console.warn(err))
        .finally(() => callback());
    }else if(prevInvitationKeyword===undefined){
        getApiCall({ url, dispatch, abort:false })
        .then((resp) => {
          if (resp !== 0 && resp!==undefined) {
            let { data, page_meta } = resp;
            dispatch(setInvitationsData(data));
            dispatch(
              setMeta({
                page: page_meta.current_page,
                pages: page_meta.total / page_meta.per_page,
                total: page_meta.total,
              })
            );
          }else if(resp===undefined){
            console.log('[Previous keyword search aborted], getApiCall response:',resp)
          } else {
            message.error(
              "Could not fetch invitations. Something went wrong on server side"
            );
          }
        })
        .catch((err) => console.warn(err))
        .finally(() => callback());
    }

   
  };
};
