import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Button,
  Input,
  Checkbox,
  Radio,
  Row,
  Col,
  DatePicker,
  TimePicker,
  InputNumber,
} from 'antd';
import Moment from 'moment';

const FormItem = Form.Item;
const { TextArea } = Input;

const DynamicField = (props) => {
  const { wait_options, sequences } = props;

  // const [deliveryTimeData, setDeliveryTimeData]=useState(undefined);

  const [deliveryTimeType, setDeliveryTimeType] = useState([]);

  const setDeliveryTime = (sequences) => {
    if (sequences) {
      let new_deliveryTimeType = [...deliveryTimeType];
      sequences.forEach((sequence, index) => {
        if (sequence.date) {
          new_deliveryTimeType[index] = 'Date';
        } else if (sequence.day) {
          if (sequence.day && sequence.time) {
            new_deliveryTimeType[index] = 'Day';
          } else if (sequence.day && !sequence.time) {
            new_deliveryTimeType[index] = 'Immediately';
          }
        }
      });

      setDeliveryTimeType(new_deliveryTimeType);
    }
  };

  useEffect(() => {
    setDeliveryTime(sequences);
  }, [sequences]);

  const handleDeliveryTimeChange = (index, event) => {
    let new_deliveryTimeType = [...deliveryTimeType];
    new_deliveryTimeType[index] = event.target.value;

    setDeliveryTimeType(new_deliveryTimeType);
  }; 

  return (
    <Form.List name='sequences'>
      {(fields, { add, remove }) => {
        if (fields.length === 0) {
          add();
        }

        return (
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.key} className='message-field'>
                  <div className='d-flex justify-content-between'>
                    <h6 className='message-field__title'>
                      User detail #{index + 1}
                    </h6>
                    {fields.length > 1 ? (
                      <Button
                        type='danger'
                        size='large'
                        shape='round'
                        className='dynamic-delete-button'
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  

                  <FormItem
                    label='User Id'
                    className='w-100'
                    name={[index, 'userid']}
                    // name={[field.name, "subject"]}
                    // fieldKey={[field.fieldKey, "subject"]}
                    rules={[{ required: true, message: 'user id is required' }]}
                  >
                    <Input placeholder='user id' size='large' />
                  </FormItem>
                  <FormItem
                    label='Email'
                    className='w-100'
                    name={[index, 'email']}
                    // name={[field.name, "content"]}
                    // fieldKey={[field.fieldKey, "content"]}
                    rules={[{ required: true, message: 'email is required' }]}
                  >
                    <Input placeholder='email' size='large' />
                  </FormItem>
                  <FormItem
                    label='Full Name'
                    className='w-100'
                    name={[index, 'fullname']}
                    // name={[field.name, "content"]}
                    // fieldKey={[field.fieldKey, "content"]}
                    rules={[{ required: true, message: 'fullname is required' }]}
                  >
                    <Input placeholder='full name' size='large' />
                  </FormItem>
                </div>
              );
            })}

            <Form.Item>
              <Button
                type="primary"
                // type="dashed"
                size='medium'
                shape='round'
                icon={<PlusOutlined />}
                onClick={() => {
                  add();
                }}
              >
                Add new
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default DynamicField;
