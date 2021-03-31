/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import { isArray } from './index'

export const isAdmin = roles => isSiteAdmin(roles) || isUserAdmin(roles)

export const isSiteAdmin = roles => isArray(roles) && roles.includes('admin')

export const isUserAdmin = roles => isArray(roles) && roles.includes('user_admin')
