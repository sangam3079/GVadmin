import React, { useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import AntTable from 'cleanComponents/Table/Table';
import { Button, Divider, Modal } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  setATag,
  setTagKeyword,
  setTagCurrentpage,
} from 'store/actions/Tags/TagsAction';
import {
  PlusCircleFilled,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { getAllTags, deleteTag } from 'services/tags';
import CustomSelect from '../Notifications/CustomSelect';
import { urlWithParams, getApiCall, tagsGroupUrl } from 'services/url';
import { apiEndpoint } from 'services/constants';

const Tags = ({ data, dispatch, total, history, currentPage, keyword }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  // const [keyword, setKeyword] = useState()
  const [prevTagSearchKeyword, setPrevTagSearchKeyword] = useState(undefined);

  const [tagGroupData, setTagGroupData] = useState([]);
  const [fetchingTagGroup, setFetchingTagGroup] = useState(false);
  const [tagGroupValue, setTagGroupValue] = useState();

  const handleKeywordFilter = (value) => {
    // setKeyword(value);
    console.log(value);
    dispatch(setTagKeyword(value));
  };

  const handleTableChange = (pagination) => {
    if (pagination.current !== currentPage) {
      // setCurrentPage(pagination.current);
      dispatch(setTagCurrentpage(pagination.current));
    }
  };

  const handleTagGroupChange = (value) => {
    setTagGroupValue(value);
  };

  const handleTagGroupSearch = (search_word) => {
    const params = {
      filter: { keyword: search_word },
    };
    const url = urlWithParams(`${apiEndpoint}/${tagsGroupUrl}`, params);
    setFetchingTagGroup(true);
    getApiCall({ url })
      .then((resp) => {
        console.log(resp);
        if (resp) {
          setTagGroupData(resp.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setFetchingTagGroup(false);
      });
  };

  const navigateToNewTag = (_) => {
    dispatch(setATag({}));
    history.push('/tags/new');
  };

  const navigateToEdit = (row) => {
    dispatch(setATag(row));
    history.push(`/tags/${row.id}/edit`);
  };

  const deleteThisTag = (id) => {
    setFetching(true);
    dispatch(deleteTag({ id, callback: () => setFetching(false) }));
  };

  const { confirm } = Modal;

  function showDeleteConfirm(id) {
    confirm({
      title: 'Are you sure delete this tag?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteThisTag(id);
      },
      onCancel() {},
    });
  }

  const columns = [
    {
      title: 'Tag',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tag Group',
      dataIndex: 'tag_group',
      name: 'tag_group',
      render: (tag_group) => {
        return <span key={tag_group.id}>{tag_group.name}</span>;
      },
    },
    {
      title: 'Action',
      render: (col, row) => {
        return (
          <div>
            <EditOutlined
              className='text-primary'
              onClick={() => navigateToEdit(row)}
              title='Edit Tag group'
            />
            <Divider type='vertical' />
            <DeleteOutlined
              className='text-danger'
              onClick={() => showDeleteConfirm(row.id)}
              title='Delete Tag group'
            />
          </div>
        );
      },
    },
  ];

  const button = (
    <Button onClick={navigateToNewTag} type='primary'>
      <span className='px-2'>
        <PlusCircleFilled />
      </span>
      New Tags
    </Button>
  );

  const fetchTags = () => {
    setPrevTagSearchKeyword(keyword);

    const defaultFilter = {
      keyword,
      tag_group: tagGroupValue ? tagGroupValue.value : undefined,
    };
    const params = {
      per_page: 10,
      page: currentPage,
      filter: defaultFilter,
    };
    setFetching(true);
    dispatch(
      getAllTags({
        params,
        callback: () => setFetching(false),
        prevTagSearchKeyword,
      })
    );
  };

  useEffect(() => {
    if (!data.length) {
      fetchTags();
    }
    handleTagGroupSearch('');
  }, []);

  useEffect(() => {
    fetchTags();
  }, [keyword, currentPage, tagGroupValue]);

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='utils__title text-uppercase'>
          <strong>Tags</strong>
        </div>
      </div>
      <Header
        button={button}
        handleKeywordFilter={handleKeywordFilter}
        keywordValue={keyword}
        extraFilter={
          <CustomSelect
            onSearch={handleTagGroupSearch}
            value={tagGroupValue}
            onChange={handleTagGroupChange}
            loading={fetchingTagGroup}
            data={tagGroupData}
            style={{ width: 150 }}
            placeholder='Filter by Tag group'
            allowClear
          />
        }
        // handleDateFilter={handleDateFilter}
      />
      <div className='card-body'>
        <AntTable
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize: 10,
            total: total,
            current: currentPage,
            showSizeChange: false,
          }}
          onChange={handleTableChange}
          loading={fetching}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.Tag.data,
    total: state.Tag.total,
    keyword: state.Tag.keyword,
    currentPage: state.Tag.currentPage,
  };
};

export default connect(mapStateToProps)(withRouter(Tags));
