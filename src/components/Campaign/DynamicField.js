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
                      Message #{index + 1}
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
                  <Row>
                    <Col span={4}>
                      <FormItem
                        label='Delivery Time'
                        // name="delivery_time"
                        name={[index, 'delivery_time']}
                      >
                        <Radio.Group
                          options={wait_options}
                          className='d-flex flex-column'
                          onChange={(e) => handleDeliveryTimeChange(index, e)}
                        />
                      </FormItem>
                    </Col>
                    {deliveryTimeType[index] === 'Day' && (
                      <>
                        <Col span={6} offset={1}>
                          <Form.Item label='Day' name={[index, 'day']}>
                            <InputNumber style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                        <Col span={6} offset={1}>
                          <Form.Item label='Time' name={[index, 'time']}>
                            <TimePicker
                              format='hh:mm:ss A'
                              style={{ width: '100%' }}
                              // showTime={{ defaultValue: Moment('00:00:00', 'HH:mm:ss') }}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    )}

                    {deliveryTimeType[index] === 'Date' && (
                      <>
                        <Col span={6} offset={1}>
                          <Form.Item label='Date' name={[index, 'date']}>
                            <DatePicker
                              format='YYYY-MM-DD'
                              style={{ width: '100%' }}
                              // showTime={{ defaultValue: Moment('00:00:00', 'HH:mm:ss') }}
                            />
                          </Form.Item>
                        </Col>

                        <Col span={6} offset={1}>
                          <Form.Item label='Time' name={[index, 'time']}>
                            <TimePicker
                              use12Hours
                              format='hh:mm:ss'
                              style={{ width: '100%' }}
                              // showTime={{ defaultValue: Moment('00:00:00', 'HH:mm:ss') }}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    )}
                  </Row>

                  <FormItem
                    label='Subject'
                    className='w-100'
                    name={[index, 'subject']}
                    // name={[field.name, "subject"]}
                    // fieldKey={[field.fieldKey, "subject"]}
                    rules={[{ required: true, message: 'subject is required' }]}
                  >
                    <Input placeholder='subject' size='large' />
                  </FormItem>
                  <FormItem
                    label='Message'
                    className='w-100'
                    name={[index, 'content']}
                    // name={[field.name, "content"]}
                    // fieldKey={[field.fieldKey, "content"]}
                    rules={[{ required: true, message: 'message is required' }]}
                  >
                    <TextArea autoSize={{ minRows: 4, maxRows: 12 }} />
                  </FormItem>
                </div>
              );
            })}

            <Form.Item>
              <Button
                // type="primary"
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
