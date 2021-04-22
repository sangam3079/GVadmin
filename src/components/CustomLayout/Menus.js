import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import logo from 'assets/images/goodvibes.jpg';
import { Layout, Menu, Dropdown } from 'antd';
import styles from './style.module.scss';
import { setCollapsed } from '../../store/actions/Sidebar/SidebarActions';
import {
  UserOutlined,
  DashboardOutlined,
  WalletOutlined,
  GroupOutlined,
  GlobalOutlined,
  AccountBookOutlined,
  CustomerServiceOutlined,
  BellOutlined,
  DownloadOutlined,
  PlaySquareOutlined,
  TagOutlined,
  FormOutlined,
  PercentageOutlined,
  PlusCircleOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import {
  setCategoryCurrentpage,
  setCategoryKeyword,
} from 'store/actions/Category/CategoryAction';
import {
  setTagGroupCurrentpage,
  setTagGroupKeyword,
  setTagCurrentpage,
  setTagKeyword,
} from 'store/actions/Tags/TagsAction';
import {
  setNotificationCurrentpage,
  setNotificationKeyword,
} from 'store/actions/Notification/NotificationAction';
import {
  setCampaignCurrentpage,
  setCampaignKeyword,
} from 'store/actions/Campaign/CampaignAction';
import {
  setPlaylistCurrentpage,
  setPlaylistKeyword,
} from 'store/actions/Playlist/PlaylistAction';
import {
  setRitualCurrentpage,
  setRitualKeyword,
} from 'store/actions/Ritual/RitualAction';
import {
  setTrackCurrentpage,
  setTrackKeyword,
} from 'store/actions/Tracks/TrackActions';
import {
  setDownloadCurrentpage,
  setDownloadKeyword,
} from 'store/actions/Download/DownloadAction';
import {
  setCustomerCurrentpage,
  setCustomerKeyword,
} from 'store/actions/Customer/CustomerAction';
import {
  setGenreCurrentpage,
  setGenreKeyword,
} from 'store/actions/Genre/GenreAction';
import {
  setSubscriptionCurrentpage,
  setSubscriptionKeyword,
} from 'store/actions/Subscription/SubscriptionAction';

import { DownOutlined } from '@ant-design/icons';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];



const Menus = ({ dispatch, isMobileView, collapsed, selectionKey }) => {
  const { Sider } = Layout;
  const handleCollapse = () => {
    dispatch(setCollapsed(!collapsed));
  };

  const analyticMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/analytic-tracks">Tracks</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/tags">customer</Link>
      </Menu.Item>
    </Menu>
  );

  const { SubMenu } = Menu;

  // submenu keys of first level
  const rootSubmenuKeys = ['campaign', 'usercampaign', ];

  const [openKeys, setOpenKeys] = useState(['campaign']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  
  


  return (
    <Sider
      collapsible={!isMobileView ? true : false}
      collapsed={collapsed}
      onCollapse={handleCollapse}
      className={`${styles.menu} ${styles.light}`}
      width={256}
    >
      <div className={styles.logo} style={{ backgroundColor: '#e4e9f0' }}>
        <div
          className={`${styles.logoContainer} d-flex justify-content-center`}
        >
          <img
            alt='logo'
            src={logo}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
        </div>
      </div>
      <Scrollbars
        className={
          isMobileView ? styles.scrollbarMobile : styles.scrollbarDesktop
        }
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              width: '4px',
              borderRadius: 'inherit',
              backgroundColor: '#c5cdd2',
              left: '1px',
            }}
          />
        )}
        autoHide
      >
        <Menu
          defaultSelectedKeys={[selectionKey]}
          mode='inline'
          theme='light'
          className={styles.navigation}
          overflowedIndicator={true}
        >
          <Menu.Item key='dashboard'>
            <Link to='/'>
              <DashboardOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span className={styles.title}>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item
            key='customers'
            onClick={() => {
              dispatch(setCustomerCurrentpage(1));
              dispatch(setCustomerKeyword(undefined));
            }}
          >
            <Link to='/customers'>
              <UserOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Customers</span>
            </Link>
          </Menu.Item>
          <Menu.Item
            key='tracks'
            onClick={() => {
              dispatch(setTrackCurrentpage(1));
              dispatch(setTrackKeyword(undefined));
            }}
          >
            <Link to='/tracks'>
              <CustomerServiceOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Tracks</span>
            </Link>
          </Menu.Item>
          {/*
          <Menu.Item key='composers'>
            <Link to='/composers'>
              <FormOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Composers</span>
            </Link>
          </Menu.Item>
          */}
          <Menu.Item
            key='category'
            onClick={() => {
              dispatch(setCategoryCurrentpage(1));
              dispatch(setCategoryKeyword(undefined));
            }}
          >
            <Link to='/categories'>
              <GroupOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Category</span>
            </Link>
          </Menu.Item>

          

          <Menu.Item
            key='genres'
            onClick={() => {
              dispatch(setGenreCurrentpage(1));
              dispatch(setGenreKeyword(undefined));
            }}
          >
            <Link to='/genres'>
              <WalletOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Genre</span>
            </Link>
          </Menu.Item>
          <Menu.Item
            key='tags'
            onClick={() => {
              dispatch(setTagCurrentpage(1));
              dispatch(setTagKeyword(undefined));
              dispatch(setTagGroupCurrentpage(1));
              dispatch(setTagGroupKeyword(undefined));
            }}
          >
            <Link to='/tags'>
              <TagOutlined className={`${styles.icon} icon-collapsed-hidden`} />
              <span>Tags</span>
            </Link>
          </Menu.Item>
          <Menu.Item
            key='playlists'
            onClick={() => {
              dispatch(setPlaylistCurrentpage(1));
              dispatch(setPlaylistKeyword(undefined));
            }}
          >
            <Link to='/playlists'>
              <PlaySquareOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Playlists</span>
            </Link>
          </Menu.Item>
          {/*
          <Menu.Item
            key='rituals'
            onClick={() => {
              dispatch(setRitualCurrentpage(1));
              dispatch(setRitualKeyword(undefined));
            }}
          >
            <Link to='/rituals'>
              <PlaySquareOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Rituals</span>
            </Link>
          </Menu.Item>
          */}
          <Menu.Item
            key='subscriptions'
            onClick={() => {
              dispatch(setSubscriptionCurrentpage(1));
              dispatch(setSubscriptionKeyword(undefined));
            }}
          >
            <Link to='/subscriptions'>
              <GlobalOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Subscription</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='promos'>
            <Link to='/promos'>
              <PercentageOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Promos</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item
            key='notification'
            onClick={() => {
              dispatch(setNotificationCurrentpage(1));
              dispatch(setNotificationKeyword(undefined));
            }}
          >
            <Link to='/notifications'>
              <BellOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Push Notification</span>
            </Link>
          </Menu.Item> */}
          {/*
          <Menu.Item
            key='campaign'
            onClick={() => {
              dispatch(setCampaignCurrentpage(1));
              dispatch(setCampaignKeyword(undefined));
            }}
          >
            <Link to='/campaign'>
              <BellOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Campaign</span>
            </Link>
          </Menu.Item> */}
          <Menu.Item
            key='download'
            onClick={() => {
              dispatch(setDownloadCurrentpage(1));
              dispatch(setDownloadKeyword(undefined));
            }}
          >
            <Link to='/downloads'>
              <DownloadOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Download</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='logs'>
            <Link to='/logs'>
              <AccountBookOutlined
                className={`${styles.icon} icon-collapsed-hidden`}
              />
              <span>Activity Logs</span>
            </Link>
          </Menu.Item>
          {/*
          <Menu.Item key='analytics'>
              <Dropdown overlay={analyticMenu} trigger={['click']} placement="bottomRight" arrow>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Analytics <AccountBookOutlined className={`${styles.icon} icon-collapsed-hidden`}/>
                </a>
              </Dropdown>  
          </Menu.Item> */}
          <SubMenu key="campaign" title="Campaign">
            <Menu.Item 
              key="campaign"
              onClick={() => {
                dispatch(setCategoryCurrentpage(1));
                dispatch(setCategoryKeyword(undefined));
              }}
            >
              <Link to='/campaign'>
                <BellOutlined
                  className={`${styles.icon} icon-collapsed-hidden`}
                />
                <span>Campaign</span>
              </Link>
            </Menu.Item>
            <Menu.Item 
            /*
              key="userCampaign"
              
              onClick={() => {
                dispatch(setCategoryCurrentpage(1));
                dispatch(setCategoryKeyword(undefined));
              }} */
            >
              <Link to='/userCampaign'>
                <BellOutlined
                  className={`${styles.icon} icon-collapsed-hidden`}
                />
                <span>User Campaign</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Scrollbars>
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    collapsed: state.Sidebar.isCollapsed,
    isMobileView: state.Sidebar.isMobileView,
    isMobileDrawerOpen: state.Sidebar.isMobileDrawerOpen,
  };
};

export default React.memo(connect(mapStateToProps)(Menus));
