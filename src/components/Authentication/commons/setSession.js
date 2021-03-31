/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import cookie from 'utils/cookie'

export default function setSession(headers) {
  cookie.setSession(headers)
}
