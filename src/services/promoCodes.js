import { getApiCall, postApiCall, urlWithParams } from "./url";

import { promoCodesUrl } from "./url";
import { apiEndpoint } from "services/constants";
import {
  setMeta,
  setPromoCodesData,
  setPromoCodes,
  addPromoCodes,
  promoCodesUpdate,
  deletePromoCode,
} from "store/actions/PromoCodes/PromoCodesAction";
import { message } from "antd";

export const getAllPromoCodes = (obj) => {
  let { callback, params, prevPromoKeyword} = obj;
  let url = urlWithParams(`${apiEndpoint}/${promoCodesUrl}`, params);
  return async (dispatch) => {
    if(prevPromoKeyword!==undefined){
      try {
        const response = await getApiCall({ url, dispatch, abort:true });
        if (!!response) {
          let { data, page_meta } = response;
          dispatch(setPromoCodesData(data));
          dispatch(
            setMeta({
              page: page_meta.current_page,
              pages: page_meta.total / page_meta.per_page,
              total: page_meta.total,
            })
          );
        }else if(response===undefined){
          console.log('[Previous keyword search aborted], getApiCall response:',response)
        } else {
          message.error(
            "Could not fetch promo codes. Something went wrong on server side"
          );
        }
      } catch (err) {
        console.warn(err);
      } finally {
        callback && callback();
      }
    }else if(prevPromoKeyword===undefined){
      try {
        const response = await getApiCall({ url, dispatch, abort:false });
        if (!!response) {
          let { data, page_meta } = response;
          dispatch(setPromoCodesData(data));
          dispatch(
            setMeta({
              page: page_meta.current_page,
              pages: page_meta.total / page_meta.per_page,
              total: page_meta.total,
            })
          );
        }else if(response===undefined){
          console.log('[Previous keyword search aborted], getApiCall response:',response)
        } else {
          message.error(
            "Could not fetch promo codes. Something went wrong on server side"
          );
        }
      } catch (err) {
        console.warn(err);
      } finally {
        callback && callback();
      }
    }

 
  };
};

export const getPromoCodes = (obj) => {
  let { callback, id } = obj;
  let url = `${apiEndpoint}/${promoCodesUrl}/${id}`;
  return async (dispatch) => {
    try {
      const response = await getApiCall({ url, dispatch });

      if (!!response) {
        dispatch(setPromoCodes(response));
      } else {
        message.error("Something went wrong on server side");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback && callback();
    }
  };
};

export const newPromoCodes = (obj) => {
  let { callback, body } = obj;
  let url = `${apiEndpoint}/${promoCodesUrl}`;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: "POST",
        url,
        body,
      });
      if (!!response) {
        dispatch(addPromoCodes(response));
        message.success("Successfully added a promo codes");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback && callback();
    }
  };
};

export const updatePromoCodes = (obj) => {
  let { callback, id, body } = obj;
  let url = `${apiEndpoint}/${promoCodesUrl}/${id}`;
  return async (dispatch) => {
    try {
      const response = await postApiCall({
        dispatch,
        method: "PUT",
        url,
        body,
      });
      if (!!response) {
        dispatch(promoCodesUpdate({ id, payload: response.data }));
        message.success("Successfully updated promo codes.");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback && callback();
    }
  };
};

export const promoCodeDelete = (obj) => {
  let { id, callback } = obj;
  let url = `${apiEndpoint}/${promoCodesUrl}/${id}`;
  return async (dispatch) => {
    try {
      const response = await postApiCall({ dispatch, method: "DELETE", url });
      if (!!response) {
        dispatch(deletePromoCode(id));
        message.success("Successfully deleted a promo");
      } else {
        message.error("Sorry could not delete promo. Something went wrong");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      callback && callback();
    }
  };
};
