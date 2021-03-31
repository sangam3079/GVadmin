import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isLogin} from 'utils'
import { getApiCall } from 'services/url'
import {apiEndpoint} from 'services/constants'
import Cookies from 'js-cookie'

const UserContext = createContext()

// Use this wherever current user data is required eg const {currentUser, loading} = useContext(UserContext)
const UserProvider = ({ history, children }) => {
  const [currentUser, setCurrentUser] = useState({}),
    [metrics, setMetrics] = useState({}),
    [loading, setLoading] = useState(false)

  const fetchUser = async () => {
    setLoading(true)
    let url =  `${apiEndpoint}/users/present_user`
    getApiCall({url, dispatch : ()=>{}})
    .then(resp => {
      if(resp){
        if(resp.data.current_user){
          let {customers_count, tracks_count, subscribers_count, active_users_count, current_user} = resp.data
          let metric = {
            customers_count,
            tracks_count,
            subscribers_count,
            active_users_count
          }
          // console.log('metric', metric);
          setCurrentUser(current_user)
          setMetrics(metric)
          Cookies.set('role', current_user.admin ? 'admin' : 'manager');
        }
      }
    })
    setLoading(false)
  }

  useEffect(() => {
    if(isLogin() && !Object.keys(currentUser).length){
      fetchUser()
    }
  }, [history.location.pathname])

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser,
        metrics: metrics,
        loading,
        setCurrentUser : setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node,
}

export { UserProvider, UserContext }
