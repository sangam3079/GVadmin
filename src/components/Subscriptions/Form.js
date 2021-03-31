import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { last } from 'lodash';
import { connect } from 'react-redux';
import { Form } from '../styled';
import NewForm from './SubscriptionForm';
import CustomLayout from '../CustomLayout/CustomLayout';
import Header from '../../components/Header/Header';
import { getSubscription, getAllUnsubscribedUser } from 'services/subscription';

const Subscription = ({ history, subscription, dispatch, users, ...props }) => {
  const locationPath = props.location.pathname.split('/');
  const [loading, setLoading] = useState(false);
  const [action] = useState(last(locationPath)),
    [id] = useState(locationPath[locationPath.length - 2]);

  //   console.log(locationPath);
  //   console.log(action);
  //   console.log(id);
  //   console.log(subscription);
  //   console.log(!Object.keys(subscription).length);

  // const fetchUsers = () => {
  // 	let params = {
  // 		filter : {}
  // 	}
  // 	dispatch(getAllUnsubscribedUser({params}))
  // };

  const handleCallback = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (action === 'edit' && !Object.keys(subscription).length) {
      dispatch(getSubscription({ id, callback: handleCallback }));
    }
    // fetchUsers()
  }, [props.location.pathname]);

  // console.log(record)
  return (
    <CustomLayout sidebarSelectionKey='subscriptions'>
      <div className='card'>
        <Header
          title={action === 'edit' ? 'Edit Subscription' : 'New Subscription'}
          subtitle={
            action === 'edit'
              ? 'Edit all necessary fields to edit the subscritpion'
              : 'Fill all necessary fields to add new subscription'
          }
        />
        <div className='card-body'>
          <div className='row'>
            <div className='col-lg-12'>
              <NewForm
                history={history}
                initialValues={subscription}
                action={action}
                id={id}
                // users={users}
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
    subscription: state.Subscription.subscription,
    users: state.Subscription.unsubscribedUser,
  };
};

export default connect(mapStateToProps)(Subscription);
