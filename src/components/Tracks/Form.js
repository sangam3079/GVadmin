import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { last } from 'lodash';
import { Form } from '../styled';
import NewForm from './TrackNewForm';
import CustomLayout from '../CustomLayout/CustomLayout';
import Header from '../Header/Header';
import { getTrack } from 'services/tracks';
import { getAllCategories } from 'services/category';
// import {getAllCompositions} from 'services/composition';

const Track = ({
  history,
  track,
  dispatch,
  categories,
  // composition,
  ...props
}) => {
  const locationPath = props.location.pathname.split('/');
  const [loading, setLoading] = useState(false);
  const [action] = useState(last(locationPath)),
    [id] = useState(locationPath[locationPath.length - 2]),
    [record, setRecord] = useState({});

  console.log(categories);
  useEffect(() => {
    let record = {
      paid: false,
      push_notification: false,
      active: false,
      ...track,
    };
    setRecord(record);
  }, [track]);

  useEffect(() => {
    if (action === 'edit' && !Object.keys(track).length) {
      setLoading(true);
      dispatch(getTrack({ id, callback: handleCallback }));
    }
    if (!Object.keys(categories).length) {
      setLoading(true);
      let params = {
        page: 1,
        per_page: 10,
        filter: {},
        sort: {},
      };
      dispatch(getAllCategories({ params, callback: handleCallback }));
    }

    // if (!Object.keys(composition).length){
    // 	console.log("composition",composition);
    // 	setLoading(true);
    // 	let params = {
    // 		page : 1,
    // 		per_page : 10,
    // 		filter : {},
    // 		sort : {}
    // 	};
    // 	dispatch(getAllCompositions({params, callback : handleCallback}))
    // }
  }, [props.location.pathname]);

  const handleCallback = () => {
    setLoading(false);
  };

  if (!record) return <>Loading..</>;
  return (
    <CustomLayout sidebarSelectionKey='tracks'>
      <div className='card'>
        <Header
          title={action === 'edit' ? 'Edit Track' : 'New Track'}
          subtitle={
            action === 'edit'
              ? 'Edit fields to edit this track'
              : 'Fill all necessary fields to create new track'
          }
        />
        <div className='card-body'>
          <div className='row'>
            <div className='col-lg-12'>
              <NewForm
                history={history}
                initialValues={record}
                action={action}
                id={id}
                imageName={record.image_name}
                musicName={record.track_name}
                categories={categories}
                // composition={composition}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

Form.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    track: state.Track.track,
    categories: state.Category.data,
    // composition:state.Composition.data,
  };
};

export default connect(mapStateToProps)(Track);
