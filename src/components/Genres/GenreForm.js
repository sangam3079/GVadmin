import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Upload, Checkbox, Switch } from 'antd';
import { connect } from 'react-redux';
import { updateGenre, newGenre } from 'services/genre';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadOutlined } from '@ant-design/icons';
import Placeholder from 'assets/images/placeholder-image.png';

const GenreForm = ({ history, id, initialValues, action, dispatch }) => {
  const [form] = Form.useForm();
  const [requesting, setRequesting] = useState(false);
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [displayMobile, setDisplayMobile] = useState();

  console.log('at', initialValues);
  useEffect(() => {
    setDesc(initialValues.description);
    setDisplayMobile(initialValues.display);

    form.setFieldsValue({
      name: initialValues.name,
      display: initialValues.display,
    });
  }, [initialValues]);

  const toggleDisplay = (e) => {
    setDisplayMobile(!displayMobile);
  };

  const handleFormSubmit = (value) => {
    const data = {
      ...initialValues,
      ...value,
      description: desc && desc !== ' ' ? desc : '',
      image,
      display: displayMobile,
    };

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (
        data[key] ||
        typeof data[key] === 'boolean' ||
        key === 'description'
      ) {
        formData.append(key, data[key]);
      }
    });
    setRequesting(true);
    if (action === 'edit') {
      dispatch(updateGenre({ id, body: formData, callback: handleCallback }));
    } else {
      dispatch(newGenre({ body: formData, callback: handleCallback }));
    }
  };

  const handleImageRemove = (e) => {
    setImage(undefined);
    setImageUrl(undefined);
  };

  const handleImageUpload = (file) => {
    setImage(file);
    let imgURL = URL.createObjectURL(file);
    setImageUrl(imgURL);
    return false;
  };

  const handleFormError = (err) => {
    console.log(err);
  };

  const handleCallback = () => {
    setRequesting(false);
    history.push('/genres');
  };

  return (
    <>
      <Form
        name='genre_form'
        form={form}
        onFinish={handleFormSubmit}
        onFinishError={handleFormError}
        layout='vertical'
        initialValues={{ name: initialValues.name, display: true }}
      >
        <div className='row'>
          <div className='col-lg-4'>
            <Form.Item name='image' label='Genre Image'>
              <Upload
                onRemove={handleImageRemove}
                beforeUpload={(file) => handleImageUpload(file)}
                // onChange={handleImageChange}
                image
                accept='img/*'
              >
                {
                  <img
                    src={
                      imageUrl ||
                      initialValues.genre_image_standard ||
                      Placeholder
                    }
                    className='image-table-large my-3'
                  />
                }
                <Button>
                  <UploadOutlined /> Image
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className='col-lg-8'>
            <Form.Item
              label='Genre Name'
              name='name'
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className='row my-4'>
          <div className='col-lg-12'>
            <Form.Item label='Description' name='description'>
              <CKEditor
                editor={ClassicEditor}
                data={desc ? desc : undefined}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  data === '' ? setDesc(' ') : setDesc(data);
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12 d-flex'>
            <Form.Item name='display' valuePropName='checked'>
              <Switch
                checked={displayMobile ? displayMobile : false}
                onChange={toggleDisplay}
              />
            </Form.Item>
            <span className='mx-2' style={{ marginTop: 7 }}>
              Display{' '}
            </span>
          </div>
        </div>
        <Button htmlType='submit' type='primary' loading={requesting}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default connect()(withRouter(GenreForm));
