import {
    getApiCall,
    postApiCall
} from './url'

import {loginUrl, customerUrl, signupUrl} from './url'
import {apiEndpoint} from 'services/constants'
import { message } from 'antd'
import { setCurrentUser, setUserGrowthData } from 'store/actions/Profile/ProfileActions'
// import {urlWithParams} from './url';

export const login = ({params, setSession, setTokenValue, callback }) => {
    let url = `${apiEndpoint}/${loginUrl}?email=${params.email}&password=${params.password}&remember_me=${params.remember_me}`
    return dispatch => {
        postApiCall({url, method : 'POST', dispatch, body: {}, finalCallback : callback})
        .then(resp => {
            if(resp !== 0){
                let user = {
                    ...resp.data.user,
                    role : resp.data.user.admin ? 'admin' : 'manager'
                }
                dispatch(setCurrentUser(user))
                setSession({access_token : resp.data.auth_token, uid : resp.data.uid, role : 'manager'})
                setTokenValue(resp.data.auth_token)
                message.success('Login Successful')
                callback();
            }
            else{
                callback();
                message.error('Login Failed');
            }
        })
        .catch(resp => console.log())
    }
}

export const presentUser = () => {
    let url = `${apiEndpoint}/${loginUrl}`
    return dispatch => {
        getApiCall(url)
        .then(resp => console.log(resp))
        .catch(resp => console.log(resp))
    }
}

export const setting = ({id, body,callback}) => {
    let url =  `${apiEndpoint}/${customerUrl}/${id}`
    return dispatch => {
        postApiCall({url,method : 'PUT', body, dispatch })
        .then(resp =>{
            // console.log('we are at then block')
            callback();
        })
        .catch(err => console.log(err))
    }
}

export const signup = ({params, setSession, setTokenValue, callback}) => {
    let url = `${apiEndpoint}/${signupUrl}?agreement=${params.agreement}&email=${params.email}&password=${params.password}&password_confirmation=${params.password_confirmation}&utm_params=${params.utm_params}`;
    return dispatch => {
        postApiCall({dispatch, url, body:{},method : 'POST'})
        .then(resp => {
            let login_params = {
                email : params.email,
                password : params.password,
                remember_me : true
            }
            if(resp !== 0){
                dispatch(login({params : login_params, setSession, setTokenValue, callback}))
            }else{
                message.error('Registration failed.')
            }
        })
        .catch(err => console.log(err))
    }
}

export const userGrowth = ({callback, }) => {
    let url = `${apiEndpoint}/users/customers_growth`
    return dispatch => {
        getApiCall({dispatch, url})
        .then(resp => {
            if(resp != 0){
                dispatch(setUserGrowthData(resp.data))
            }
        })
        .catch(err => console.log(err))
        .finally(() => callback())
    }
}