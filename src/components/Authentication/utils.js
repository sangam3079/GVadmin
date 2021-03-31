/* eslint-disable */
import Cookies from 'js-cookie'
import { isEmpty } from 'lodash'
// import {SO_COOKIE_PREFIX} from 'constants/index'

const SO_COOKIE_PREFIX = 'app'

function getParams({search}) {
  const utms = {}
  if (search !== '') {
    const params = search.substr(1).split('&')
    params.forEach(param => {
      const value = param.split('=')
      const key = value[0].toLowerCase()
      const val = value[1]
      utms[key] = decodeURIComponent(val)
    })
  }
  return utms
}

function setUtmCookie(utms) {
  Cookies.remove(`${SO_COOKIE_PREFIX}_so_utm_cookie`)
  const obj = {}
  const {utm_source, utm_medium, utm_campaign, utm_term, utm_content} = utms
  if (utm_source !== false) {
    obj.source = utm_source
  }
  if (utm_medium !== false) {
    obj.medium = utm_medium
  }
  if (utm_campaign !== false) {
    obj.campaign = utm_campaign
  }
  if (utm_term !== false) {
    obj.term = utm_term
  }
  if (utm_content !== false) {
    obj.content = utm_content
  }
  Cookies.set(`${SO_COOKIE_PREFIX}_so_utm_cookie`, obj, {
    domain: '.growthadvisorhq.com',
  })
}

export default function utmCookie(location) {
  const utms = getParams(location)
  if(!isEmpty(utms)) setUtmCookie(utms)
}
