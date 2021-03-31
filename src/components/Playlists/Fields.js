import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  Spin,
  Empty,
  Tooltip,
  Typography,
} from 'antd';
import { useDispatch } from 'react-redux';
import {
  UploadOutlined,
  MinusCircleFilled,
  PlaySquareOutlined,
  BookOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { updatePlaylist, newPlaylist, getPlayables } from 'services/playlist';
import CustomSelect from '../Notifications/CustomSelect';
import { apiEndpoint } from 'services/constants';
import { urlWithParams, getApiCall } from 'services/url';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import debounce from 'utils/debounce';

const { Text } = Typography;

const SortableItem = SortableElement(({ value, type, id, onDelete }) => (
  <>
    <li key={id} data-id={id} data-type={type} className='drag-drop-track my-2'>
      <span className='mr-3'>
        {type === 'Track' && <CustomerServiceOutlined />}
        {type === 'Playlist' && <PlaySquareOutlined />}
        {type === 'Ritual' && <BookOutlined />}
      </span>
      <Tooltip title={value} placement='rightBottom'>
        <Text type='warning' ellipsis>
          {value}
        </Text>
      </Tooltip>
      <span>
        <MinusCircleFilled onClick={() => onDelete(id)} />
      </span>
    </li>
  </>
));

const SortableList = SortableContainer(({ items, onDelete }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${value.id}`}
          index={index}
          value={value.name}
          type={value.type}
          id={value.id}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});

const PlaylistFields = ({ id, initialValues, action, history }) => {
  const [requesting, setRequesting] = useState();
  const [requestingPlayables, setRequestingPlayables] = useState(false);
  const [image, setImage] = useState();
  const [requestReference, setRequestReference] = useState('Track');
  const [dndItems, setDndItems] = useState([]);
  const [selectValue, setSelectValue] = useState();
  const [selectData, setSelectData] = useState([]);
  const [fetchingForSelect, setFetchingForSelect] = useState(false);
  const [tagValue, setTagValue] = useState();
  const [tagData, setTagData] = useState([]);
  const [fetchingTag, setFetchingTag] = useState(false);
  const [prevTagSearchKeyword, setPrevTagSearchKeyword] = useState(undefined);
  const [prevPlaylistKeyword, setPrevPlaylistKeyword] = useState(undefined);
  const [prevTrackKeyword, setPrevTrackKeyword] = useState(undefined);

  const [form] = Form.useForm();
  const currentDnd = useRef();
  const dispatch = useDispatch();

  const handleCallback = () => {
    setRequesting(false);
    history.push('/playlists');
  };

  useEffect(() => {
    handleTagSearch('');
  }, []);

  useEffect(() => {
    currentDnd.current = dndItems;
  }, [dndItems]);

  useEffect(() => {
    if (initialValues.id) {
      setRequestingPlayables(true);
      dispatch(
        getPlayables({
          id: initialValues.id,
          callback: handleGetPlayableCallback,
        })
      );
    }
  }, [initialValues]);

  const handleTagSearch = (value) => {
    setFetchingTag(true);

    setPrevTagSearchKeyword(value);

    const params = {
      filter: { keyword: value },
    };

    const url = urlWithParams(`${apiEndpoint}/tags`, params);

    if (prevTagSearchKeyword !== undefined) {
      getApiCall({ dispatch, url, abort: true })
        .then((resp) => {
          if (resp) {
            setTagData(resp.data);
          } else {
            message.error('Something went wrong');
          }
        })
        .catch((err) => console.warn(err))
        .finally(() => setFetchingTag(false));
    } else if (prevTagSearchKeyword === undefined) {
      getApiCall({ dispatch, url, abort: false })
        .then((resp) => {
          if (resp) {
            setTagData(resp.data);
          } else {
            message.error('Something went wrong');
          }
        })
        .catch((err) => console.warn(err))
        .finally(() => setFetchingTag(false));
    }
  };

  const handleTagChange = (value) => {
    setTagValue(value);
  };

  const delayedTagSearch = useCallback(debounce(handleTagSearch, 500), []);

  useEffect(() => {
    delayedTagSearch();
    return delayedTagSearch.cancel;
  }, [delayedTagSearch]);

  const handleGetPlayableCallback = (data) => {
    setRequestingPlayables(false);
    let arr = [];
    if (data.length) {
      data.forEach((item) => {
        let element = {
          id: item.type_id,
          name: item
            ? item.type_object
              ? item.type_object.name || item.type_object.title
              : undefined
            : undefined,
          type: item.type,
        };
        arr.push(element);
      });
      setDndItems(arr);
    }
  };

  const handleTrackSort = ({ oldIndex, newIndex }) => {
    const newSorted = arrayMove(dndItems, oldIndex, newIndex);
    setDndItems(newSorted);
  };

  const handleReferenceChange = (value) => {
    setSelectData([]);
    setRequestReference(value);
  };

  const handleImageUpload = (file) => {
    setImage(file);
    return false;
  };

  const handleSearch = (value) => {
    setFetchingForSelect(true);

    let apiTarget;
    const params = {
      filter: { keyword: value },
    };
    if (requestReference === 'Playlist') {
      apiTarget = 'playlists';
      setPrevPlaylistKeyword(value);
      setPrevTrackKeyword(undefined);
    } else if (requestReference === 'Track') {
      apiTarget = 'tracks';
      setPrevTrackKeyword(value);
      setPrevPlaylistKeyword(undefined);
    } else if (requestReference === 'Ritual') {
      apiTarget = 'rituals';
      setPrevTrackKeyword(value);
      setPrevPlaylistKeyword(undefined);
    }
    const url = urlWithParams(`${apiEndpoint}/${apiTarget}`, params);

    if (prevTrackKeyword !== undefined || prevPlaylistKeyword !== undefined) {
      getApiCall({ url, dispatch, abort: true }).then((resp) => {
        if (resp !== 0 && resp !== undefined) {
          setSelectData(resp.data);
        } else if (resp === undefined) {
          console.log(
            '[Previous keyword search aborted], getApiCall response:',
            resp
          );
        }
      });
    } else if (
      prevTrackKeyword === undefined ||
      prevPlaylistKeyword === undefined
    ) {
      getApiCall({ url, dispatch, abort: false }).then((resp) => {
        if (resp !== 0 && resp !== undefined) {
          setSelectData(resp.data);
        } else if (resp === undefined) {
          console.log(
            '[Previous keyword search aborted], getApiCall response:',
            resp
          );
        }
      });
    }
  };

  const delayedSearch = useCallback(debounce(handleSearch, 500), [
    requestReference,
  ]);

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [delayedSearch]);

  const handleRemoveItemFromPlaylist = (id) => {
    const updatedDnd = currentDnd.current.filter(
      (element) => id !== element.id
    );
    setDndItems(updatedDnd);
  };

  const handleChange = (value) => {
    let clonedDndItems = [...dndItems];
    const newItem = {
      id: value.value,
      name: value.label,
      type: requestReference,
    };
    const combinedItems = [...clonedDndItems, newItem];
    setDndItems(combinedItems);
  };

  const handleFormSubmit = (value) => {
    let data = {
      ...initialValues,
      ...value,
      image,
    };
    const playables = [];
    dndItems.forEach((item, index) => {
      let obj = {
        type: item.type,
        id: item.id,
        position: index + 1,
      };
      playables.push(obj);
    });
    let formData = new FormData();
    let playAbleData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] && !Array.isArray(data[key])) {
        formData.append(key, data[key]);
      } else if (key === 'display' && !Array.isArray(data[key])) {
        formData.append(
          key,
          data[key] === undefined
            ? 'false'
            : data[key] === false
            ? 'false'
            : 'true'
        );
      }

      if (Array.isArray(data[key])) {
        data[key].forEach((element) => {
          formData.append(`${key}_ids[]`, element.value);
        });
      }
    });
    playables.forEach((play) => {
      playAbleData.append(`playables[]`, JSON.stringify(play));
    });
    if (action === 'edit') {
      setRequesting(true);
      dispatch(
        updatePlaylist({
          id,
          body: formData,
          playables: playAbleData,
          callback: handleCallback,
          final: () => setRequesting(false),
        })
      );
    } else {
      setRequesting(true);
      dispatch(
        newPlaylist({
          body: formData,
          callback: handleCallback,
          playables: playAbleData,
          final: () => setRequesting(false),
        })
      );
    }
  };

  useEffect(() => {
    const tagValue = [];
    if (initialValues && initialValues.tags) {
      if (
        initialValues.tags.forEach((tag) => {
          let obj = {
            key: tag.id,
            value: tag.id,
            label: tag.name,
          };
          tagValue.push(obj);
        })
      )
        setTagValue(tagValue);
    }
    form.setFieldsValue({
      title: initialValues.title,
      description: initialValues.description,
      display: initialValues.display,
      slug: initialValues.slug,
      tag: tagValue,
    });
  }, [initialValues]);

  const { Item } = Form;
  const { Option } = Select;

  return (
    <>
      <Form
        name='playlist_form'
        form={form}
        onFinish={handleFormSubmit}
        layout='vertical'
      >
        <div className='row'>
          <div className='col-lg-12'>
            <Item name='image' label='Image'>
              <Upload beforeUpload={(file) => handleImageUpload(file)} image>
                <Button>
                  <UploadOutlined /> Image
                </Button>
              </Upload>
              {initialValues && initialValues.image_standard ? (
                <img
                  src={initialValues.image_standard}
                  className='image-table-large my-3'
                />
              ) : null}
            </Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <Item
              name='title'
              label='Title'
              rules={[{ required: true, message: 'Title is required' }]}
            >
              <Input />
            </Item>
          </div>
          <div className='col-lg-6'>
            <Item
              name='description'
              label='Description'
              rules={[{ required: false }]}
            >
              <Input.TextArea />
            </Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <Form.Item name='tag' label='Select tag for playlist'>
              <CustomSelect
                value={tagValue}
                loading={fetchingTag}
                onSearch={delayedTagSearch}
                onChange={handleTagChange}
                data={tagData}
                mode='multiple'
                showArrow
              />
            </Form.Item>
          </div>
        </div>
        <div className='row my-3'>
          <div className='col-lg-6'>
            <Item
              label='Search Album or Track'
              name='reference'
              rules={[
                {
                  required: false,
                  message: 'Track is required to create playlist',
                },
              ]}
            >
              <div className='row'>
                <div className='col-lg-4'>
                  <Select
                    onChange={handleReferenceChange}
                    placeholder='Select Reference'
                    defaultValue='Track'
                  >
                    <Option value='Track'>Track</Option>
                    <Option value='Playlist'>Playlist</Option>
                    <Option value='Ritual'>Ritual</Option>
                  </Select>
                </div>
                <div className='col-lg-8'>
                  <CustomSelect
                    placeholder='Search'
                    value={selectValue}
                    onSearch={delayedSearch}
                    onChange={handleChange}
                    loading={fetchingForSelect}
                    data={selectData}
                  />
                </div>
              </div>
              <div className='row my-5'>
                <div className='col-lg-12'>
                  <h4 className='mx-1 d-flex justify-content-center'>
                    {dndItems.length ? 'Order Tracks and Playlist' : ''}
                  </h4>
                  <div className='box-h250 px-5'>
                    {requestingPlayables ? (
                      <div className='d-flex justify-content-center'>
                        <Spin />
                      </div>
                    ) : (
                      <SortableList
                        items={dndItems}
                        onSortEnd={handleTrackSort}
                        pressDelay={200}
                        onDelete={handleRemoveItemFromPlaylist}
                      />
                    )}
                    {!requestingPlayables && !dndItems.length ? (
                      <div className='d-flex justify-content-center align-items-center'>
                        <Empty />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </Item>
          </div>
          <div className='col-lg-6'>
            <Item
              label='Slug'
              name='slug'
              rules={[{ required: true, message: 'Slug is required' }]}
            >
              <Input />
            </Item>
          </div>
        </div>
        <div className='d-flex justify-content-between d-none'>
          <div className='d-flex align-items-center'>
            <Item>
              <Button htmlType='submit' type='primary' loading={requesting}>
                Submit
              </Button>
            </Item>
          </div>
        </div>
      </Form>
    </>
  );
};

export default withRouter(PlaylistFields);
