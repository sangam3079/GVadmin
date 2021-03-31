import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get } from 'lodash';
import { NavLink } from 'react-router-dom';
import theme from 'constants/theme';
import { UserContext } from 'contexts/UserContext';

const Container = styled.div`
    background-color: ${theme.color.sidebar.background};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    position: fixed;
    overflow: auto;
    width: 210px;
    height: 100%;
    z-index: 5;
    padding-bottom: 55px;
    margin-right: 55px;
  `,
  LogoContainer = styled.div`
    background: ${theme.color.sidebar.darkBackground};
    padding: 20px;
    font-weight: bolder;
    font-size: 18px;
    display: flex;
    cursor: pointer;
    align-items: center;
    color: #ffffff;
    img {
      width: 166px;
    }
  `,
  SectionContainer = styled.div`
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${theme.color.sidebar.border};
  `,
  Topic = styled.div`
    padding: 10px 20px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    color: #adb3ba;
  `,
  Link = styled(NavLink)`
    color: ${theme.color.sidebar.text};
    padding: 10px 20px;
    font-size: 14px;
    position: relative;
    &.route-active {
      font-weight: bolder;
      color: #ffffff;
    }
    &.route-active::after {
      position: absolute;
      border-radius: 50%;
      background: ${theme.color.primary};
      width: 6px;
      height: 6px;
      top: 50%;
      transform: translateY(-50%);
      right: -10px;
      content: '';
      display: none;
    }
  `,
  Menu = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    background: #fff;
    z-index: 10;
    width: 210px;
    border: 1px solid ${theme.color.border.fade};
  `,
  LeavePage = styled(NavLink)`
    height: 50px;
    font-size: 14px;
    padding: 0px 15px;
    color: ${theme.color.primary};
    display: flex;
    align-items: center;
    margin-bottom: 200px;
  `,
  NormalLink = styled.div`
    padding: 10px 0;
    > a {
      font-size: 14px;
      position: relative;
      color: ${theme.color.text.primary};
    }
  `,
  NoPadding = styled(NormalLink)`
    padding: 10px 20px;
  `;

export const RouteWithSidebar = styled.div`
  ${'' /* padding-left: 210px; */}
  width: 100%;
`;

const Sidebar = ({ items, history, isSettingsPage }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <Container>
        <LogoContainer onClick={() => history.push('')}>
          GOODVIBES
        </LogoContainer>
        {items.map(
          (item) =>
            !item.hide && (
              <SectionContainer key={item.name}>
                <Link
                  to={item.link}
                  style={item.style}
                  activeClassName={!item.isRedirect && 'route-active'}
                  key={item.name}
                >
                  {item.name}
                </Link>
              </SectionContainer>
            )
        )}
      </Container>
    </>
  );
};

Sidebar.propTypes = {
  history: PropTypes.object,
  isSettingsPage: PropTypes.bool,
  items: PropTypes.array.isRequired,
};

export default Sidebar;
