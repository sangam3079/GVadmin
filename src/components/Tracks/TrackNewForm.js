import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Upload,
  Button,
  message,
  Switch,
  Progress,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { newTrack, updateTrack } from 'services/tracks';
import { urlWithParams, getApiCall } from 'services/url';
import { apiEndpoint } from 'services/constants';
import CustomSelect from 'components/Notifications/CustomSelect';
import Placeholder from 'assets/images/placeholder-image.png';

const TrackFormFields = ({
  initialValues,
  action,
  id,
  history,
  dispatch,
  uploadPercent,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [description, setDesc] = useState('');
  const [audio, setAudio] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [preview, setPreview] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [genreValue, setGenreValue] = useState();
  const [categoryFetching, setCategoryFetching] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const [tagValue, setTagValue] = useState();
  const [tagData, setTagData] = useState([]);
  const [fetchingTag, setFetchingTag] = useState(false);
  const [compositionValue, setCompositionValue] = useState();
  const [compositionData, setCompositionData] = useState([]);
  const [fetchingComposition, setFetchingComposition] = useState(false);

  const [prevCompSearchValue, setPrevCompSearchValue] = useState(undefined);
  const [prevTagSearchValue, setPrevTagSearchValue] = useState(undefined);
  const [prevGenreSearchValue, setPrevGenreSearchValue] = useState(undefined);

  const [prevUrl, setPrevUrl] = useState(undefined);

  console.log('initialValues', initialValues);

  // useEffect(()=>{
  //    console.log('compositionData changes',compositionData);
  // },[compositionData]);

  const defaultImageFileList = initialValues.track_image
    ? [
        {
          uid: '1',
          name: initialValues.track_image,
          status: 'done',
          url: initialValues.track_image,
        },
      ]
    : undefined;

  const defaultTrackFileList = initialValues.track_file
    ? [
        {
          uid: '1',
          name: initialValues.track_name,
          status: 'done',
          url: initialValues.track_file,
        },
      ]
    : undefined;

  useEffect(() => {
    let tagValue = [];
    if (initialValues && initialValues.tags) {
      if (initialValues.tags.length) {
        initialValues.tags.forEach((tag) => {
          let obj = {
            key: tag.id,
            value: tag.id,
            label: tag.name,
          };
          tagValue.push(obj);
        });
      }
      setTagValue(tagValue);
    }
    const genre_value = {
      key:
        initialValues && initialValues.genre
          ? initialValues.genre.id
          : undefined,
      label:
        initialValues && initialValues.genre
          ? initialValues.genre.name
          : undefined,
      value:
        initialValues && initialValues.genre
          ? initialValues.genre.id
          : undefined,
    };
    const category_value = {
      key:
        initialValues && initialValues.category
          ? initialValues.category.id
          : undefined,
      label:
        initialValues && initialValues.category
          ? initialValues.category.name
          : undefined,
      value:
        initialValues && initialValues.category
          ? initialValues.category.id
          : undefined,
    };

    const composition_value = {
      key:
        initialValues && initialValues.composition
          ? initialValues.composition.id
          : undefined,
      label:
        initialValues && initialValues.composition
          ? initialValues.composition.title
          : undefined,
      value:
        initialValues && initialValues.composition
          ? initialValues.composition.id
          : undefined,
    };
    setGenreValue(genre_value);
    setCategoryValue(category_value);
    setCategoryValue(composition_value);
    setDesc(
      initialValues && initialValues.description
        ? initialValues.description
        : undefined
    );

    if (initialValues && initialValues.genre) {
      handleGenreChange(genre_value);
    }

    form.setFieldsValue({
      name: initialValues.name,
      category_id: initialValues.category_id
        ? {
            key: initialValues.category.id,
            label: initialValues.category.name,
            value: initialValues.category.id,
          }
        : undefined,
      track_code: initialValues.track_code,
      composer_name: initialValues.composer_name,
      published_at: initialValues.created_at
        ? moment(initialValues.created_at, 'MMMM-D, YYYY')
        : undefined,
      push_notification: initialValues.push_notification,
      show_timer: initialValues.show_timer,
      active: initialValues.active,
      unlisted: initialValues.unlisted,
      paid: initialValues.paid,
      track_type: initialValues.track_type,
      tag: tagValue,
      genre: genre_value,
      category: category_value,
      composition: composition_value,
    });
  }, [initialValues]);

  // fetch data once using empty keyword
  useEffect(() => {
    handleGenreSearch(' ');
    handleTagSearch(' ');
    handleCompositionSearch(' ');
  }, []);

  const handleAudioUpload = (file) => {
    setAudio(file);
    return false;
  };

  const handleImageRemove = (e) => {
    setImage(undefined);
    setImageUrl(undefined);
  };

  const handleImageUpload = (file) => {
    setImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return false;
  };

  const handleCategoryChange = (value) => {
    setCategoryValue(value);
    setCategoryFetching(false);
  };

  const handleSubmit = (value) => {
    let published_at = value.published_at
      ? value.published_at.format()
      : undefined;
    let active = typeof value.active === 'undefined' ? false : value.active;
    let unlisted =
      typeof value.unlisted === 'undefined' ? false : value.unlisted;
    let push_notification =
      typeof value.push_notification === 'undefined'
        ? false
        : value.push_notification;
    let data = {
      ...value,
      description,
      active,
      unlisted,
      push_notification,
      published_at,
      track_file: audio,
      image: image,
      composition_id: value.composition ? value.composition.value : undefined,
      category_id: value.category ? value.category.value : undefined,
      genre: undefined,
      category: undefined,
      composition: undefined,
    };

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (
        data[key] !== undefined &&
        data[key] !== null &&
        !Array.isArray(data[key])
      ) {
        formData.append(key, data[key]);
      }
      if (Array.isArray(data[key])) {
        data[key].forEach((element) => {
          formData.append(`${key}_ids[]`, element.value);
        });
      }
    });
    proceed(formData);
  };

  const proceed = (body) => {
    setSubmitting(true);
    if (action === 'new') {
      dispatch(
        newTrack({
          body,
          successCallback: handleSuccessCallback,
          callback: handleCallback,
        })
      );
    } else {
      dispatch(
        updateTrack({
          id,
          body,
          successCallback: handleSuccessCallback,
          callback: handleCallback,
        })
      );
    }
  };

  const handleError = (err) => {
    console.log(err);
  };

  const handleTagSearch = (value) => {
    setFetchingTag(true);
    const params = {
      filter: { keyword: value },
    };
    const url = urlWithParams(`${apiEndpoint}/tags`, params);

    if (
      prevTagSearchValue !== undefined &&
      prevTagSearchValue !== value &&
      prevTagSearchValue !== ' '
    ) {
      setPrevTagSearchValue(value);

      getApiCall({ dispatch, url, abort: true })
        .then((resp) => {
          if (resp) {
            setTagData(resp.data);
          } else if (resp === undefined) {
            console.log('getApiCall response:', resp);
          } else {
            message.error('Something went wrong');
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setFetchingTag(false));
    } else if (prevTagSearchValue === undefined || prevTagSearchValue === ' ') {
      setPrevTagSearchValue(value);

      getApiCall({ dispatch, url, abort: false })
        .then((resp) => {
          if (resp) {
            setTagData(resp.data);
          } else if (resp === undefined) {
            console.log('getApiCall response:', resp);
          } else {
            message.error('Something went wrong');
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setFetchingTag(false));
    }
  };

  const handleTagChange = (value) => {
    setTagValue(value);
  };

  const handleCompositionSearch = async (value) => {
    setFetchingComposition(true);
    const params = {
      filter: { keyword: value },
    };

    const url = urlWithParams(`${apiEndpoint}/compositions`, params);

    if (
      prevCompSearchValue !== undefined &&
      prevCompSearchValue !== value &&
      prevCompSearchValue !== ' '
    ) {
      setPrevCompSearchValue(value);
      setPrevUrl(url);

      getApiCall({ dispatch, url, abort: true })
        .then((resp) => {
          if (resp) {
            setCompositionData(resp.data);
          } else if (resp === undefined) {
            console.log('getApiCall response:', resp);
          } else {
            message.error('Something went wrong');
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setFetchingComposition(false));
    } else if (
      prevCompSearchValue === undefined ||
      prevCompSearchValue === ' '
    ) {
      setPrevCompSearchValue(value);
      setPrevUrl(url);

      getApiCall({ dispatch, url, abort: false })
        .then((resp) => {
          if (resp) {
            setCompositionData(resp.data);
          } else if (resp === undefined) {
            console.log('getApiCall response:', resp);
          } else {
            message.error('Something went wrong');
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setFetchingComposition(false));
    }
  };

  const handleCompositionChange = (value) => {
    setCompositionValue(value);
  };

  const handleGenreSearch = (value) => {
    const params = {
      filter: { keyword: value },
    };
    const url = urlWithParams(`${apiEndpoint}/genres`, params);
    if (
      prevGenreSearchValue !== undefined &&
      prevGenreSearchValue !== value &&
      prevGenreSearchValue !== ' '
    ) {
      setPrevGenreSearchValue(value);
      getApiCall({ dispatch, url, abort: true })
        .then((resp) => {
          if (resp) {
            setGenreData(resp.data);
          } else if (resp === undefined) {
            console.log('getApiCall response:', resp);
          } else {
            message.error('Something went wrong');
          }
        })
        .catch((err) => console.log(err));
    } else if (
      prevGenreSearchValue === undefined ||
      prevGenreSearchValue === ' '
    ) {
      setPrevGenreSearchValue(value);
      getApiCall({ dispatch, url, abort: false })
        .then((resp) => {
          if (resp) {
            setGenreData(resp.data);
          } else if (resp === undefined) {
            console.log('getApiCall response:', resp);
          } else {
            message.error('Something went wrong');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleGenreChange = (value) => {
    console.log(value.label);
    const params = {
      filter: { genre: value.label[0] },
    };
    const url = urlWithParams(`${apiEndpoint}/categories`, params);
    getApiCall({ dispatch, url })
      .then((resp) => {
        if (resp) {
          setCategoryData(resp.data);
          // console.log(resp.data)
        } else {
          message.error('Something went wrong');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSuccessCallback = () => {
    history.push('/tracks');
  };

  const handleCallback = () => {
    setSubmitting(false);
  };

  const handleImageChange = () => {
    setPreview(true);
  };

  return (
    <div>
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        onFinishFailed={handleError}
        name='track_form'
        form={form}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label='Title'
              name='name'
              rules={[{ required: true, message: 'Title is required' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div className='row'>
          <div className='col-lg-4 d-flex'>
            <Form.Item
              label='Genre'
              name='genre'
              rules={[{ required: true, message: 'Genre is required' }]}
            >
              <CustomSelect
                style={{ width: 220 }}
                showArrow
                value={genreValue}
                loading={fetchingTag}
                onSearch={handleGenreSearch}
                onChange={handleGenreChange}
                data={genreData}
              />
            </Form.Item>
          </div>
          <div className='col-lg-4'>
            <Form.Item
              label='Category'
              name='category'
              rules={[{ required: true, message: 'Category is required' }]}
            >
              <Select
                style={{ width: 220 }}
                value={categoryValue}
                onChange={handleCategoryChange}
                labelInValue
                showSearch
                filterOption={(inputValue, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) >= 0 ||
                  option.props.value
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) >= 0
                }
              >
                {categoryData.map((city) => (
                  <Option key={city.id}>{city.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className='col-lg-4'>
            <Form.Item
              label='Type'
              name='track_type'
              rules={[{ required: false, message: 'Track Type is required' }]}
            >
              <Select
                value={initialValues ? initialValues.track_type : undefined}
              >
                <Option key='free' value='free'>
                  Free
                </Option>
                <Option key='paid' value='paid'>
                  Paid
                </Option>
                <Option key='premium' value='premium'>
                  Premium
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <Form.Item
              label='Track code'
              name='track_code'
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <Form.Item
              label="Composer's Name"
              name='composer_name'
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className='col-lg-6'>
            <Form.Item
              label='Publish Date'
              name='published_at'
              rules={[{ required: false }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <Form.Item label='Upload Track Image' name='image'>
              <Upload
                onRemove={handleImageRemove}
                beforeUpload={handleImageUpload}
                defaultFileList={defaultImageFileList}
                image
                onChange={handleImageChange}
                accept='img/*'
              >
                <Button>
                  <UploadOutlined /> Image
                </Button>
              </Upload>
              {
                // preview && initialValues.track_image && <img src={image || initialValues.track_image || Placeholder} className="image-table-large my-2" />
                <img
                  src={imageUrl || initialValues.track_image || Placeholder}
                  className='image-table-large my-2'
                />
              }
            </Form.Item>
          </div>
          <div className='col-lg-6'>
            <Form.Item label='Upload Track' name='track_file'>
              <Upload
                beforeUpload={(file) => handleAudioUpload(file)}
                // customRequest={req => handleAudioUploadRequest(req)}
                defaultFileList={defaultTrackFileList}
                audio
              >
                <Button>
                  <UploadOutlined /> Music
                </Button>
              </Upload>
              {initialValues.track_url && (
                <>
                  <audio
                    src={initialValues.track_url}
                    controls
                    style={{
                      margin: '15px auto',
                      width: '100%',
                      background: '#f1f3f4',
                    }}
                    className='shadow'
                  ></audio>
                </>
              )}
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <Form.Item name='composition' label='Select composition for track'>
              <CustomSelect
                value={compositionValue}
                loading={fetchingComposition}
                onSearch={handleCompositionSearch}
                onChange={handleCompositionChange}
                data={compositionData}
              />
            </Form.Item>
          </div>

          <div className='col-lg-6'>
            <Form.Item name='tag' label='Select tags for track'>
              <CustomSelect
                value={tagValue}
                loading={fetchingTag}
                onSearch={handleTagSearch}
                onChange={handleTagChange}
                data={tagData}
                mode='multiple'
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item label='Description' name='description'>
          <CKEditor
            editor={ClassicEditor}
            data={description ? description : ''}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDesc(data);
            }}
          />
        </Form.Item>
        <div style={{ marginTop: '20px' }}>
          <div className='row'>
            <div className='col-lg-10'>
              <div className='d-flex justify-content-between flex-wrap'>
                <div>
                  <Form.Item
                    label='Active'
                    name='active'
                    valuePropName='checked'
                  >
                    <Switch
                      defaultChecked={
                        initialValues ? initialValues.active : false
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label='Unlisted'
                    name='unlisted'
                    valuePropName='checked'
                  >
                    <Switch
                      defaultChecked={
                        initialValues ? initialValues.unlisted : false
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label='Send Push Notification'
                    name='push_notification'
                    valuePropName='checked'
                  >
                    <Switch
                      defaultChecked={
                        initialValues ? initialValues.push_notification : false
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label='Showtimer'
                    name='show_timer'
                    valuePropName='checked'
                  >
                    <Switch
                      defaultChecked={
                        initialValues ? initialValues.show_timer : false
                      }
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className='col-lg-2'></div>
          </div>
        </div>
        <Button type='primary' htmlType='submit' loading={submitting}>
          Submit
        </Button>
        <div>
          {uploadPercent && (
            <div className='row'>
              <div className='col-lg-12'>
                <Progress
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={uploadPercent}
                />
              </div>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  uploadPercent: state.UploadPercentage.percentage,
});

export default connect(mapStateToProps)(withRouter(TrackFormFields));
