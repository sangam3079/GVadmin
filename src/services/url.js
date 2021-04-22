import * as errorActions from '../store/actions/Error/ErrorActions';
import cookie from 'utils/cookie';
import { message } from 'antd';
import Axios from 'axios';
import {
  clearUploadPercentage,
  setUploadPercentage,
} from 'store/actions/Misc/UploadPercentageAction';
import { removeUndefinedFromObject } from 'utils/helpers';

export const customerUrl = 'users';
export const tracksUrl = 'tracks';
export const popularTracksUrl = 'tracks/popular';

export const compositionsUrl = 'compositions';
export const logsUrl = 'activity_logs';
export const customerGrowth = `${customerUrl}/customers_growth`;
export const loginUrl = 'login';
export const signupUrl = 'signup';
export const categoriesUrl = 'categories';
export const genresUrl = 'genres';
export const notificationUrl = '';
export const subscriptionsUrl = 'subscriptions';
export const tracks = 'tracks';
export const notificationsUrl = 'push_notifications';
export const downloadsUrl = 'downloads';
export const playlistsUrl = 'playlists';
export const ritualsUrl = 'rituals';
export const campaignUrl = 'campaigns';
export const playablesUrl = 'playables';
export const tagsUrl = 'tags';
export const tagsGroupUrl = 'tag_groups';
export const promoCodesUrl = 'promo_codes';
export const redemptionsUrl = 'promo_code_redemptions';
export const invitationsUrl = 'invitations';
export const userGroupsCampaignUrl = 'user_groups'

export let authToken = cookie.getToken();

let controller = new AbortController();

export const getApiCall = async ({ id, dispatch, url, abort }) => {
  if (abort) {
    // abort previous search text on new search continuation
    controller.abort();
    controller = new AbortController();
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: authToken,
        },
        signal: controller.signal,
      });
      let status = response.status;
      if (status.toString()[0] === '2') {
        return response.json();
      } else {
        handleResponseError({ response, dispatch });
        return 0;
      }
    } catch (err) {
      handleApiCallError({ err, dispatch });
      // to not show error alert on search abort of searching
      if (err.code !== 20 && err.name !== 'AbortError') {
        message.error(err.message);
      }
    }
  } else {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: authToken,
        },
        signal: controller.signal,
      });
      // console.log(response);
      let status = response.status;
      if (status.toString()[0] === '2') {
        return response.json();
      } else {
        handleResponseError({ response, dispatch });
        return 0;
      }
    } catch (err) {
      handleApiCallError({ err, dispatch });

      // to not show error alert on search abort of searching
      if (err.code !== 20 && err.name !== 'AbortError') {
        message.error(err.message);
      }
    }
  }
};

export const postApiCall = async ({
  id,
  dispatch,
  url,
  method,
  body,
  finalCallback,
}) => {
  dispatch(clearUploadPercentage());
  return await Axios({
    url,
    method,
    headers: {
      Authorization: authToken,
    },
    data: body,
    onUploadProgress: (progressEvent) => {
      let length = progressEvent.lengthComputable
        ? progressEvent.total
        : progressEvent.target.getResponseHeader('content-length') ||
          progressEvent.target.getResponseHeader(
            'x-decompressed-content-length'
          );
      let progress = Math.round((progressEvent.loaded * 100) / length);
      dispatch(setUploadPercentage(progress));
    },
  })
    .then((response) => {
      dispatch(clearUploadPercentage());
      let status = response.status;
      let json = response.data;
      return [status, json];
    })
    .then((resp) => {
      if (resp[0].toString()[0] === '2') {
        return resp[1];
      } else {
        resp[1].then((mes) =>
          message.error(mes.message || mes.error || 'Something went wrong')
        );
        return 0;
      }
    })
    .catch((err) => {
      if (err.response) {
        handleApiCallError({ err, dispatch });
      } else if (err.request) {
        console.warn(err.request);
      } else {
        console.warn('err', err.message);
      }
      console.warn(err.config);
      message.error(err.response.data.error);
      return 0;
    })
    .finally(() => {
      if (typeof finalCallback === 'function') {
        finalCallback();
      }
    });
};

export function abortPreviousRequest() {
  controller.abort();
}

const handleApiCallError = (obj) => {
  let {
    err: { response },
    dispatch,
  } = obj;

  let status = response ? response.status : undefined;
  let error_message = response ? response.data.error : undefined;

  // when search abort occurs
  if (obj.err.code === 20 && obj.err.name === 'AbortError') {
    console.log(obj.err.message);
  } else {
    dispatch(errorActions.apiCallError({ status, error_message }));
  }
};

const handleResponseError = (obj) => {
  let { response, dispatch } = obj;
  let status = response.status;
  let error_message =
    'Opps something went wrong. We are looking at it. Thank you.';
  dispatch(errorActions.error500({ status, error_message }));
};

export const setTokenValue = (token) => {
  authToken = `Bearer ${token}`;
};

export function consume(reader) {
  var total = 0;
  return new Promise((resolve, reject) => {
    function pump() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            resolve();
            return;
          }
          total += value.byteLength;
          console.log(
            `received ${value.byteLength} bytes (${total} bytes in total)`
          );
          pump();
        })
        .catch(reject);
    }
    pump();
  });
}

export const urlWithParams = (url, params) => {
  let { per_page, page, filter, sort } = params;
  let plainUrl = url;
  let urlWithParams;

  if (!params) {
    return plainUrl + '?per_page=10&page=1';
  } else {
    urlWithParams = plainUrl + '?';
  }

  if (per_page) {
    urlWithParams = `${urlWithParams}per_page=${per_page}&`;
  }

  if (page) {
    urlWithParams = `${urlWithParams}page=${page}&`;
  }

  if (filter && Object.keys(filter).length) {
    let cleanFilter = removeUndefinedFromObject(filter);
    if (cleanFilter) {
      urlWithParams = `${urlWithParams}filters=${JSON.stringify(cleanFilter)}&`;
    }
  }

  if (sort && Object.keys(sort).length) {
    let cleanSort = removeUndefinedFromObject(sort);
    if (cleanSort) {
      urlWithParams = `${urlWithParams}sorts=${JSON.stringify(cleanSort)}&`;
    }
  }

  return urlWithParams;
};

export const getFileApiCall = async ({ dispatch, url }) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: authToken,
      },
      signal: controller.signal,
    });

    let status = response.status;
    if (status.toString()[0] === '2') {
      return response.blob();
    } else {
      handleResponseError({ response, dispatch });
      return 0;
    }
  } catch (err) {
    handleApiCallError({ err, dispatch });
    message.error(err.message);
  }
};
