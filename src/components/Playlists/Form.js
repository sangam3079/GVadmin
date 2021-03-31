import React, { useState, useEffect } from 'react';
import { last } from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomLayout from 'components/CustomLayout/CustomLayout';
import Header from 'components/Header/Header';
import NewForm from './Fields';
import { getPlaylist } from 'services/playlist';

const Form = ({ playlist, dispatch, history, location }) => {
  const locationPath = location.pathname.split('/');
  const [action] = useState(last(locationPath));
  const [id] = useState(locationPath[locationPath.length - 2]);
  const [record, setRecord] = useState({});

  useEffect(() => {
    if (action === 'edit' && !Object.keys(playlist).length) {
      dispatch(getPlaylist({ id, callback: () => {} }));
    }
  }, [location.pathname]);

  useEffect(() => {
    setRecord(playlist);
  }, [playlist]);

  return (
    <CustomLayout sidebarSelectionKey='playlists'>
      <div className='card'>
        <Header
          title='New Genre'
          subtitle='Fill all necessary fields to add new genre'
        />
        <div className='card-body'>
          <div className='row'>
            <div className='col-lg-12'>
              <NewForm
                initialValues={action === 'edit' ? record : {}}
                action={action}
                id={id}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    playlist: state.Playlist.playlist,
  };
};

export default connect(mapStateToProps)(withRouter(Form));
