import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { last, isEmpty } from 'lodash';

import { Form } from '../styled';
import NewForm from './PromoCodeForm';
import CustomLayout from '../CustomLayout/CustomLayout';
import Header from '../Header/Header';
import Spinner from 'components/Spinner/Spinner';
import { getPromoCodes } from 'services/promoCodes';

const PromoCodes = ({ history, promoCode, dispatch, ...props }) => {
  const locationPath = props.location.pathname.split('/');
  const [loading, setLoading] = useState(false);
  const [action] = useState(last(locationPath)),
    [id] = useState(locationPath[locationPath.length - 2]);

  const fetchPromoCodeCallback = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (action === 'edit' && isEmpty(promoCode)) {
      setLoading(true);
      dispatch(getPromoCodes({ id, callback: fetchPromoCodeCallback }));
    }
  }, [props.location.pathname]);

  return (
    <CustomLayout sidebarSelectionKey='promos'>
      <div className='card'>
        <Header
          title={action === 'edit' ? 'Edit Promo Code' : 'New Promo Code'}
          subtitle={
            action === 'edit'
              ? 'Edit fields to edit the Promo Code'
              : 'Fill all necessary field to generate a new promo code'
          }
        />
        <div className='card-body'>
          <div className='row'>
            <div className='col-lg-12'>
              {loading ? (
                <div className='my-5'>
                  <Spinner />
                </div>
              ) : (
                <NewForm
                  history={history}
                  initialValues={promoCode}
                  action={action}
                  id={id}
                />
              )}
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
    promoCode: state.PromoCodes.promoCodes,
  };
};

export default connect(mapStateToProps)(PromoCodes);
