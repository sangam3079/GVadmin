import React,{useState, useEffect, Fragment} from 'react'
import CustomLayout from '../CustomLayout/CustomLayout'
import DynamicField from './DynamicGroupField';
import {Form,Divider,Button,Row, Col, Input, DatePicker} from 'antd'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';


const FormItem = Form.Item;

const UserForm =(props) => {


    const { history, campaign } = props;
    const [buttonDisable, setButtonDisable] = useState(false);
    const [requesting, setRequesting] = useState();
    const [form] = Form.useForm();

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    const createTemplateMarkup = (templatePreviewData) => {
        return {
          __html: templatePreviewData,
        };
      };

    const handleFormSubmit = (values) => {
        console.log('form values  ', values);
        let sequences = [];
        let data = {
            ...values
        };
        console.log('submit data', data);

        setButtonDisable(true);
    
        const handleCallback = () => {
          setRequesting(false);
          setButtonDisable(false);
          history.push('/UserGroups');
        };

        let formData = new FormData();

        Object.keys(data).forEach((key) => {
            console.log('data', key, data[key]);
            if (data[key] && !Array.isArray(data[key])) {
              console.log('data array', key, data[key]);
              if (key === 'timezone') {
                formData.append(`${key}`, data[key].value);
              } else {
                formData.append(key, data[key]);
              }
            } else if (data[key] === null) {
              console.log('data null', key, data[key]);
              formData.append(key, '');
            } else if (key === 'sequences' && Array.isArray(data[key])) {
              data[key].forEach((sequences, index) => {
                Object.keys(sequences).forEach((key) => {
                  formData.append(`sequences[${index}][${key}]`, sequences[key]);
                });
              });
            } else if (key === 'timezone' && Array.isArray(data[key])) {
              formData.append(`${key}`, data[key][0].value);
            } else if (Array.isArray(data[key])) {
              // empty values / "" in array pushed or else old values appear
              if (data[key].length === 0) {
                formData.append(`${key}[]`, '');
              } else {
                data[key].forEach((item, index) => {
                  formData.append(`${key}[]`, data[key][index]);
                });
              }
            }
          });
    }    


    return (
        <CustomLayout sidebarSelectionKey='campaign'>
            <React.Fragment className='bg-white p-5'>
                <Form layout='vertical' form={form} onFinish={handleFormSubmit} >
                <div>
                    <Row>
                    <Col span={11}>
                        <FormItem 
                            className='w-100'
                            name='title'
                            label='Groups Title'
                            rules={[{ required: true, message: 'title is required' }]}
                        >
                            <Input 
                                placeholder='Enter the Group/campaign title'
                                size='medium'
                            />
                        </FormItem>
                    </Col>

                    <Col span={12} offset={1}>
                        <Form.Item 
                        label='Select a Date' 
                        name='select a date'>
                            <DatePicker onChange={onChange}  />
                        </Form.Item>
                    </Col>
                    </Row>
                </div>

                <Divider dashed className='header-title ' style={{marginLeft:-100}}>
                    User Details{' '}
                </Divider>

                <DynamicField
                    //wait_options={wait_options}
                    //sequences={sequencesValues}
                />

                <Button
                    // shape="round"
                    size='large'
                    type='primary'
                    block
                    htmlType='submit'
                    disabled={buttonDisable}
                >
                    Submit
                </Button>
                </Form>
            </React.Fragment>
        </CustomLayout>
    )
}

const mapStateToProps = (state) => {
    return {
      campaign: state.Campaign.campaign,
     
    };
  };

export default connect(mapStateToProps)(withRouter(UserForm))
