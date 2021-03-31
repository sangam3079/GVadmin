/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import Cookies from 'js-cookie'
import { SO_COOKIE_PREFIX, INTERCOM_APP_ID } from '../constants'

const ADMIN_IMP_PATH = 'admin_imp_path'

const setAdminImpPath = path => {
  Cookies.set(ADMIN_IMP_PATH, path)
}

const getAdminImpPath = () => {
  const path = Cookies.get(ADMIN_IMP_PATH)
  return path || ''
}

const getHeader = () => {
  try {
    const header = Cookies.get(`${SO_COOKIE_PREFIX}_so_jwt_header`)
    return header ? JSON.parse(header) : {}
  }catch(e) {
    return {}
  }
}

export const getToken = () => {
  const token = Cookies.get(`${SO_COOKIE_PREFIX}_so_jwt_token`)
  return token || ''
}

export const getUid = () => {
  const uid = Cookies.get(`${SO_COOKIE_PREFIX}_so_jwt_uid`)
  return uid || ''
}

export const getUserRole = () =>{
  const role = Cookies.get('role')
  console.log(role);
  return role || ''
}

export const getClientId = () => {
  const clientId = Cookies.get(`${SO_COOKIE_PREFIX}_so_jwt_clientId`)
  return clientId || ''
}

const getTokenExpirationDate = token => {
  if (!token.expiry) return null
  const date = new Date(0)
  date.setUTCSeconds(token.expiry)
  return date
}

const isTokenExpired = header => {
  const expirationDate = getTokenExpirationDate(header)
  return expirationDate < new Date()
}

const getSession = () => {
  const header = getHeader()
  return header['access_token'] ? true : false
}

const setSession = value => {
  const { uid, access_token, role} = value
  Cookies.set(`${SO_COOKIE_PREFIX}_so_jwt_token`, access_token)
  Cookies.set(`${SO_COOKIE_PREFIX}_so_jwt_uid`, uid)
  Cookies.set(`${SO_COOKIE_PREFIX}_so_jwt_header`, JSON.stringify(value))
  Cookies.set(`${SO_COOKIE_PREFIX}_so_jwt_role`, role)
}

const clearSession = () => {
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_jwt_token`)
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_jwt_header`)
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_jwt_clientId`)
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_jwt_uid`)
  Cookies.remove(`intercom-id-${INTERCOM_APP_ID}`)
  isImpersonating() && removeImpersonatorDetails()
}

const clearAll = () => {
  const cookies = document.cookie.split(';')
  localStorage.clear()
  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf('=')
    const key = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    clearSession(key)
  })
}

const setImpersonator = () => {
  Cookies.set(`${SO_COOKIE_PREFIX}_so_imp_header`, getHeader())
  Cookies.set(`${SO_COOKIE_PREFIX}_so_imp_token`, getToken())
  Cookies.set(`${SO_COOKIE_PREFIX}_so_imp_uid`, getUid())
  Cookies.set(`${SO_COOKIE_PREFIX}_so_imp_clientId`, getClientId())
  Cookies.set(`${SO_COOKIE_PREFIX}_so_imp_role`, getUserRole())
}

const getImpersonatorCookie = cookieString => {
  return Cookies.get(cookieString)
}

const isImpersonating = () => {
  const impersonator = Cookies.get(`${SO_COOKIE_PREFIX}_so_imp_uid`)
  return !!impersonator
}

const removeImpersonatorDetails = () => {
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_imp_header`)
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_imp_token`)
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_imp_uid`)
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_imp_clientId`)
  Cookies.remove(ADMIN_IMP_PATH)
}

const setAdminHeader = () => {
  Cookies.set(
    `${SO_COOKIE_PREFIX}_so_jwt_header`,
    getImpersonatorCookie(`${SO_COOKIE_PREFIX}_so_imp_header`),
  )
  Cookies.set(
    `${SO_COOKIE_PREFIX}_so_jwt_token`,
    getImpersonatorCookie(`${SO_COOKIE_PREFIX}_so_imp_token`),
  )
  Cookies.set(
    `${SO_COOKIE_PREFIX}_so_jwt_clientId`,
    getImpersonatorCookie(`${SO_COOKIE_PREFIX}_so_imp_clientId`),
  )
  Cookies.set(
    `${SO_COOKIE_PREFIX}_so_jwt_uid`,
    getImpersonatorCookie(`${SO_COOKIE_PREFIX}_so_imp_uid`),
  )
  Cookies.set(
    `${SO_COOKIE_PREFIX}_so_jwt_role`,
    getImpersonatorCookie(`${SO_COOKIE_PREFIX}_so_imp_role`)
  )
}

export const updateProfileGoalCookie = () => {
  Cookies.set(`${SO_COOKIE_PREFIX}_so_profile_updated`, true)
}

export const getProfileGoalCookie = () => {
  const profile = Cookies.get(`${SO_COOKIE_PREFIX}_so_profile_updated`)
  return profile || ''
}

export const updateGrantGoalCookie = () => {
  Cookies.set(`${SO_COOKIE_PREFIX}_so_grant_updated`, true)
}

export const getGrantGoalCookie = () => {
  const grant = Cookies.set(`${SO_COOKIE_PREFIX}_so_grant_updated`)
  return grant || ''
}

export const updatePayGoalCookie = () => {
  Cookies.set(`${SO_COOKIE_PREFIX}_so_pay_updated`, true)
}

export const getPayGoalCookie = () => {
  const pay = Cookies.set(`${SO_COOKIE_PREFIX}_so_pay_updated`)
  return pay || ''
}

export const getUtmValue = () => {
  const utmValues = Cookies.get(`${SO_COOKIE_PREFIX}_so_utm_cookie`)
  return utmValues || ''
}

export default {
  getSession,
  getHeader,
  setSession,
  clearSession,
  clearAll,
  getTokenExpirationDate,
  setImpersonator,
  removeImpersonatorDetails,
  isImpersonating,
  getUid,
  getClientId,
  setAdminHeader,
  setAdminImpPath,
  getAdminImpPath,
  getUtmValue,
  getToken,
  getUserRole
}
