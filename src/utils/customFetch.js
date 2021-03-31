/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */

import { API_ENDPOINT } from 'constants/url';
import axios from 'axios';

let cancelToken;

export default async function customFetch(endpoint, method, body, headers) {
  const metaHeaders = { ...headers, 'Content-Type': 'application/json' };

  //Check if there are any previous pending requests
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel('Operation canceled due to new request.');
  }

  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();

  try {
    let response;
    if (headers) {
      response = await axios({
        method,
        url: `${API_ENDPOINT}/${endpoint}`,
        headers: headers['Content-Type'] ? headers : metaHeaders,
        params: body,
        data: body,
        cancelToken: cancelToken.token, //Pass the cancel token to the current request
      });
    } else {
      response = await axios({
        method,
        url: `${API_ENDPOINT}/${endpoint}`,
        headers: metaHeaders,
        params: body,
        data: body,
        cancelToken: cancelToken.token, //Pass the cancel token to the current request
      });
    }
    return [response.data, await response.headers];
  } catch (error) {
    console.log(error);
    // return [error.response.data, await error.response.headers]
  }
}
