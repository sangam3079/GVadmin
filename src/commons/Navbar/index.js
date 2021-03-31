import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import cookie from 'utils/cookie'
import { get } from 'lodash'
import { useApolloClient } from 'react-apollo-hooks'

import Dropdown from 'commons/Dropdown'
import { UserContext } from 'contexts/UserContext'
import Logo from 'assets/images/goodvibes.jpg'
import avatar from 'assets/images/avatar.png'
import {
  HeaderWrapper,
  Header,
  CompanyLogo,
  LogoLink,
  Menu,
  MenuItem,
  Image,
  ProfileDropdown,
  Avatar,
} from './styled'

const Navbar = ({ admin, history, fluid, items, user }) => {
  const client = useApolloClient()
  const context = useContext(UserContext)
  const pic = get(context, 'currentUser.userProfile.profilePicture')

  return (
    <HeaderWrapper style={{ top: cookie.isImpersonating() ? 48 : 0 }}>
      <Header>
        <CompanyLogo>
          <LogoLink to="/">
            <Image src={Logo} alt="company logo" />
          </LogoLink>
        </CompanyLogo>
        <Menu right>
          <Dropdown
            target={() => (
              <ProfileDropdown>
                <Avatar src={pic || avatar} alt="profile" />
              </ProfileDropdown>
            )}
            isSearchable={false}
            options={[
              {
                id     : 2,
                label  : 'Settings',
                onClick: () => history.push('/settings'),
              },
              {
                id     : 3,
                label  : 'Logout',
                onClick: () => {
                  cookie.clearAll()
                  client.resetStore()
                  history.push('/auth')
                },
              }
            ]}
          />
        </Menu>
      </Header>
    </HeaderWrapper>
  )
}

Navbar.defaultProps = {
  admin: false,
  fluid: false,
  items: [],
  user : {
    userProfile: {
      profilePicture: null,
    },
  },
}

Navbar.propTypes = {
  admin  : PropTypes.bool,
  fluid  : PropTypes.bool,
  history: PropTypes.object,
  items  : PropTypes.array,
  user   : PropTypes.object,
}

export default withRouter(Navbar)
