import React from 'react';
import { Layout, BackTop } from 'antd';
import Sidebar from './Sidebar';
import Profile from './DropDownMenu';
import classNames from 'classnames';
// import 'antd/dist/antd.css';
import styles from './top.module.scss';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';
import BreadCrumb from 'cleanComponents/Breadcrumb/BreadCrumb';

const CustomLayout = ({ ...props }) => {
  const { Header, Footer, Content } = Layout;
  return (
    <>
      <Layout
        style={{ minHeight: 'auto' }}
        className='settings__shadowmenu cardsShadow'
      >
        <Sidebar selectionKey={props.sidebarSelectionKey} />

        <Layout style={{ minHeight: 'auto' }}>
          <Header>
            <div
              className={`d-flex justify-content-between ${styles.topbar}`}
              style={{ maxWidth: '100%' }}
            >
              <div>
                <span className='logo-text'>Good Vibes - Admin Dashboard</span>
              </div>
              <div>
                <Profile />
              </div>
            </div>
          </Header>
          <Layout>
            <ErrorBoundry>
              <Content style={{ height: '100%', position: 'relative' }}>
                <div className='utils__content'>
                  <BreadCrumb />
                  {props.children}
                </div>
              </Content>
            </ErrorBoundry>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default CustomLayout;
