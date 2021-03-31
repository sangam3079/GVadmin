import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DrawerMenu from 'rc-drawer';
import Menus from './Menus';
import 'rc-drawer/assets/index.css';
// import styles from './style.module.scss'

const Sidebar = ({
  selectionKey,
  dispatch,
  isMobileView,
  isMobileDrawerOpen,
  history,
}) => {
  const handleMask = () => {
    dispatch({ type: 'SET_MOBILE_DRAWER', payload: !isMobileDrawerOpen });
  };

  useEffect(() => {
    if (window.innerWidth < 900) {
      dispatch({ type: 'SET_MOBILE_VIEW', payload: true });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'SET_MOBILE_DRAWER', payload: false });
  }, [history.location.pathname]);

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      if (e.target.innerWidth < 900) {
        dispatch({ type: 'SET_MOBILE_VIEW', payload: true });
      } else {
        dispatch({ type: 'SET_MOBILE_VIEW', payload: false });
      }
    });
  }, [window.innerWidth]);

  // console.log('sidebar rendered')
  return isMobileView ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      open={isMobileDrawerOpen}
      onHandleClick={handleMask}
      className='drawer-light'
      defaultOpen={false}
      showMask={true}
      onMaskClick={() => {
        handleMask();
      }}
    >
      <Menus selectionKey={selectionKey} />
    </DrawerMenu>
  ) : (
    <Menus selectionKey={selectionKey} />
  );
};

const mapStateToProps = (state) => {
  return {
    collapsed: state.Sidebar.isCollapsed,
    isMobileView: state.Sidebar.isMobileView,
    isMobileDrawerOpen: state.Sidebar.isMobileDrawerOpen,
  };
};

// export default React.memo(connect(mapStateToProps)(Sidebar))

export default React.memo(connect(mapStateToProps)(withRouter(Sidebar)));
