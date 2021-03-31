/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import { compact } from 'lodash'
import theme from 'constants/theme'
import { DASHBOARD, CUSTOMERS, EMAIL_MARKETINGS, TRACKS, CATEGORIES, GENRES, SUBSCRIPTIONS, SLIDER, SETTINGS, LOGS } from 'constants/routes'

export default () => {
  return [
    {
      id: 1, name: 'Dashboard', link: DASHBOARD, items: [], hide: false
    },
    {
      id: 2, name: 'Customers', link: CUSTOMERS.INDEX, items: [], hide: false
    },
    {
      id: 3, name: 'Email Marketing', link: EMAIL_MARKETINGS.INDEX, items: [], hide: true
    },
    {
      id: 4, name: 'Tracks', link: TRACKS.INDEX, items: [], hide: false
    },
    {
      id: 5, name: 'Category', link: CATEGORIES.INDEX, items: [], hide: false
    },
    {
      id: 6, name: 'Genre', link: GENRES.INDEX, items: [], hide: false
    },
    {
      id: 7, name: 'Subscriptions', link: SUBSCRIPTIONS.INDEX, items: [], hide: false
    },
    {
      id: 8, name: 'Slider', link: SLIDER, items: [], hide: true
    },
    {
      id: 9, name: 'Activity Logs', link: LOGS, items: [], hide: false
    },
    {
      id: 10, name: 'Settings', link: SETTINGS, items: [], hide: true
    },

  ]
}
