import { getApiCall, urlWithParams } from "./url";

import { redemptionsUrl } from "./url";
import { apiEndpoint } from "services/constants";
import {
  setMeta,
  setRedemptionsData,
} from "store/actions/Redemptions/RedemptionsAction";
import { message } from "antd";

export const getAllRedemptions = (obj) => {
  let { callback, params, prevRedemptionKeyword} = obj;
  let url = urlWithParams(`${apiEndpoint}/${redemptionsUrl}`, params);
  return (dispatch) => {
    if(prevRedemptionKeyword!==undefined){
        getApiCall({ url, dispatch, abort:true })
        .then((resp) => {
          if (resp !== 0 && resp !== undefined) {
            let { data, page_meta } = resp;
            dispatch(setRedemptionsData(data));
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
              "Could not fetch redemptions data. Something went wrong on server side"
            );
          }
        })
        .catch((err) => console.warn(err))
        .finally(() => callback());
    }else if(prevRedemptionKeyword===undefined){
        getApiCall({ url, dispatch,abort:false  })
        .then((resp) => {
          if (resp !== 0 && resp !== undefined) {
            let { data, page_meta } = resp;
            dispatch(setRedemptionsData(data));
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
              "Could not fetch redemptions data. Something went wrong on server side"
            );
          }
        })
        .catch((err) => console.warn(err))
        .finally(() => callback());
    }

  };
};
