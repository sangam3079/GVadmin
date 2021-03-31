import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'utils/cookie';
import { customFetch } from 'utils';
import { newCategory, updateCategory } from 'services/category';
import TextArea from 'antd/lib/input/TextArea';
// import { setGenreData } from 'store/actions/Genre/GenreAction';

const CategoryForm = ({
  initialValues,
  genres,
  id,
  action,
  history,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [description, setDesc] = useState('');
  const [genreData, setGenreData] = useState([]);
  const [genreValue, setGenreValue] = useState();
  const [requesting, setRequesting] = useState(false);
  const all_genres = genres || [];
  const all_genres_options = all_genres.map((genre) => {
    return <Option value={genre.id}>{genre.name}</Option>;
  });

  const token = cookie.getToken();

  const handleFormSubmit = async (value) => {
    let data = {
      ...initialValues,
      ...value,
      description,
      genre_id: value.genre_id.value,
    };
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (action === 'edit') {
      setRequesting(true);
      dispatch(
        updateCategory({ id, body: formData, callback: handleCallback })
      );
    } else {
      setRequesting(true);
      dispatch(newCategory({ body: formData, callback: handleCallback }));
    }
  };

  const handleCallback = () => {
    setRequesting(false);
    history.push('/categories');
  };

  const handleFormError = (err) => {
    console.log(err);
  };

  const fetchGenre = async (value) => {
    let response;
    let response_data;

    response = await customFetch(
      'admin/v2/genres',
      'GET',
      { filters: { keyword: value } },
      { Authorization: `Bearer ${token}` }
    );

    if (response && response[0].data) {
      setGenreData(response[0].data);
    }
  };

  const handleGenreChange = (value) => {
    setGenreValue(value);
    setGenreData([]);
  };

  useEffect(() => {
    fetchGenre('');
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      name: initialValues.name,
      genre_id: initialValues.genre
        ? {
            value: initialValues.genre.id,
            key: initialValues.genre.id,
            label: initialValues.genre.name,
          }
        : undefined,
    });
    setDesc(
      initialValues && initialValues.description
        ? initialValues.description
        : undefined
    );
  }, [initialValues]);
  return (
    <>
      <Form
        name='category_form'
        onFinish={handleFormSubmit}
        onFinishFailed={handleFormError}
        form={form}
        layout='vertical'
      >
        <div className='row'>
          <div className='col-lg-6'>
            <Form.Item
              label='Category Name'
              name='name'
              rules={[
                { required: true, message: 'Category field is required' },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className='col-lg-6'>
            <Form.Item label='Genre' name='genre_id'>
              <Select
                showSearch={true}
                labelInValue
                value={genreValue}
                notFoundContent={null}
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onSearch={fetchGenre}
                onChange={handleGenreChange}
                // loading={fetchingGenre}
              >
                {genreData.map((d) => {
                  return <Option key={d.id}>{d.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>
        </div>
        <Row>
          <Col span={24}>
            <Form.Item label='Description' name='description'>
              <CKEditor
                editor={ClassicEditor}
                data={description ? description : ''}
                // data="Helllo"
                onChange={(event, editor) => {
                  const n_data = editor.getData();
                  setDesc(n_data);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button htmlType='submit' type='primary' loading={requesting}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default connect()(withRouter(CategoryForm));
