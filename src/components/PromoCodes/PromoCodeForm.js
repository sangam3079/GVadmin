import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Switch,
  Icon,
  DatePicker,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { updatePromoCodes, newPromoCodes } from 'services/promoCodes';

const PromoCodeFormFields = ({
  initialValues,
  action,
  id,
  history,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { TextArea } = Input;

  useEffect(() => {
    form.setFieldsValue({
      title: initialValues.title,
      code: initialValues.code,
      subscription_days: initialValues.subscription_days,
      remarks: initialValues.remarks,
      status: initialValues.status === 'active',
      limit: initialValues.limit ? initialValues.limit : null,
      end_date: initialValues.end_date
        ? moment(initialValues.end_date, 'YYYY-MM-DD')
        : null,
    });
  }, [initialValues]);

  const handleSubmit = (value) => {
    let end_date = value.end_date ? value.end_date.format() : undefined;
    let newFormData = {
      ...value,
      status: value.status ? 'active' : 'inactive',
      end_date,
    };

    setSubmitting(true);
    if (action === 'edit') {
      dispatch(
        updatePromoCodes({
          id,
          body: newFormData,
          callback: handleSuccessCallback,
        })
      );
    } else {
      dispatch(
        newPromoCodes({ body: newFormData, callback: handleSuccessCallback })
      );
    }
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const handleSuccessCallback = () => {
    setSubmitting(false);
    history.push('/promos/promo-codes');
  };

  return (
    <>
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        onFinishFailed={handleError}
        name='promo_code_form'
        form={form}
      >
        <div className='row'>
          <div className='col-lg-6'>
            <Form.Item
              label='Title'
              rules={[{ required: true, message: 'Title is required' }]}
              name='title'
            >
              <Input />
            </Form.Item>
          </div>
          <div className='col-lg-6'>
            <Form.Item
              label='code'
              name='code'
              rules={[{ required: true, message: 'Code is required' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <Form.Item label='Description' name='remarks'>
              <TextArea />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <Form.Item
              label='Subscription Days'
              rules={[
                { required: true, message: 'Subscription Days is required' },
              ]}
              name='subscription_days'
            >
              <InputNumber />
            </Form.Item>
          </div>
          <div className='col-lg-6'>
            <Form.Item
              label='Active/Inactive'
              name='status'
              valuePropName='checked'
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-6'>
            <Form.Item
              label='Redeem limit'
              rules={[{ required: true, message: 'Redeem limit is required' }]}
              name='limit'
            >
              <InputNumber />
            </Form.Item>
          </div>
          <div className='col-lg-6'>
            <Form.Item
              label='Expiry Date'
              name='end_date'
              rules={[{ required: true, message: 'Expiry date is required' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </div>
        </div>

        <Button type='primary' htmlType='submit' loading={submitting}>
          Submit
        </Button>
      </Form>
    </>
  );
};

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

const mapStateToProps = (state) => ({
  //
});

export default connect(mapStateToProps)(withRouter(PromoCodeFormFields));
