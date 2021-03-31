import React, { useState, useEffect, createElement } from 'react';
import CustomLayout from '../CustomLayout/CustomLayout';
import Header from '../Header/Header';
import { Button, Divider, Modal, Tag } from 'antd';
import Spinner from '../Spinner/Spinner';
import { withRouter } from 'react-router-dom';
// import cookie from 'utils/cookie'
// import customFetch from '../../utils/customFetch'
import { connect } from 'react-redux';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import { getAllgenres, deleteGenre } from 'services/genre';
import {
  setAGenre,
  setGenreCurrentpage,
  setGenreKeyword,
} from 'store/actions/Genre/GenreAction';
import AntTable from 'cleanComponents/Table/Table';
import placeholder from 'assets/images/placeholder-image.png';
import { getSorterObject } from 'utils/helpers';

const Genres = ({ history, dispatch, data, total, keyword, currentPage }) => {
  const { confirm } = Modal;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  // const [keyword, setKeyword] = useState('');
  let [prevSearchKeyword, setPrevSearchKeyword] = useState(undefined);
  const [dateFilter, setDateFilter] = useState({});
  const [sort, setSort] = useState({});
  // const [currentPage, setCurrentPage] = useState(1);
  // const token = cookie.getToken();

  const fetchGenre = (pageParam, filterParam, sortParam) => {
    setPrevSearchKeyword(keyword);

    let defaultFilter = {
      keyword,
      date_from: dateFilter.date_from,
      date_to: dateFilter.date_to,
    };
    let params = {
      page: pageParam || currentPage,
      per_page: 10,
      filter: filterParam || defaultFilter,
      sort: sortParam || sort,
    };
    setFetching(true);
    dispatch(
      getAllgenres({
        params,
        callback: handleFetchAllGenresCallback,
        prevSearchKeyword,
      })
    );
  };

  const handleFetchAllGenresCallback = () => {
    setLoading(false);
    setFetching(false);
  };

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination.current !== currentPage) {
      // setCurrentPage(pagination.current);
      dispatch(setGenreCurrentpage(pagination.current));
      // fetchGenre(pagination.current);
    }
    if (sorter) {
      let new_sort = getSorterObject(sorter);
      setSort(new_sort);
    }
  };

  function showDeleteConfirm(id) {
    confirm({
      title: 'Are you sure delete this genre?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        deleteTrack(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const editGenre = (id) => {
    let genre = data.filter((el) => el.id === id)[0];
    dispatch(setAGenre(genre));
    history.push(`/genres/${id}/edit`);
  };

  const deleteTrack = (id) => {
    setFetching(true);
    dispatch(deleteGenre({ id, callback: handleDeleteGenreCallback }));
  };

  const handleDeleteGenreCallback = () => {
    setFetching(false);
  };

  const navigate = () => {
    dispatch(setAGenre({}));
    history.push('/genres/new');
  };

  useEffect(() => {
    if (data.length) {
      handleFetchAllGenresCallback();
    } else {
      fetchGenre();
    }
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'genre_image_standard',
      render: (image) => {
        return <img src={image || placeholder} className='image-table' />;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (name) => {
        return <span className='text-capitalize'>{name}</span>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => {
        if (desc) {
          let clean = desc.replace(/<\/?[^>]+(>|$)/g, '');
          return clean;
        }
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
    },
    {
      title: 'Display',
      dataIndex: 'display',
      key: 'display',
      render: (dis) => (
        <Tag color={dis ? 'green' : 'red'}>{dis ? 'True' : 'False'}</Tag>
      ),
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      render: (record, row) => {
        return (
          <div>
            <EditOutlined
              // style={{color : 'blue'}}
              className='text-primary'
              onClick={() => editGenre(row.id)}
              title='Edit genre'
            />
            <Divider type='vertical' />
            <DeleteOutlined
              // style={{color : 'red'}}
              className='text-danger'
              onClick={() => showDeleteConfirm(row.id)}
              title='Delete genre'
            />
          </div>
        );
      },
    },
  ];

  const handleKeywordFilter = (value) => {
    // setCurrentPage(1);
    // setKeyword(value);
    dispatch(setGenreKeyword(value));
  };

  const handleDateFilter = (value) => {
    // setCurrentPage(1)
    setDateFilter(value);
  };

  useEffect(() => {
    fetchGenre();
  }, [keyword, dateFilter, sort, currentPage]);

  const renderConditionally = () => {
    if (loading) {
      return (
        <CustomLayout sidebarSelectionKey='genres'>
          <Spinner />
        </CustomLayout>
      );
    } else {
      return (
        <CustomLayout sidebarSelectionKey='genres'>
          <div className='card'>
            <Header
              handleDateFilter={handleDateFilter}
              handleKeywordFilter={handleKeywordFilter}
              keywordValue={keyword}
              // title="Genres"
              // subtitle="List of all genres"
              button={
                <Button onClick={navigate} type='primary'>
                  <span className='px-2'>
                    <PlusCircleFilled />
                  </span>
                  New Genre
                </Button>
              }
            />
            <div style={{ width: '100%' }} className='card-body'>
              <AntTable
                columns={columns}
                dataSource={data}
                pagination={{
                  pageSize: '10',
                  total: total,
                  showSizeChanger: false,
                  current: currentPage,
                }}
                onChange={handleTableChange}
                loading={fetching}
              />
            </div>
          </div>
        </CustomLayout>
      );
    }
  };

  return renderConditionally();
};

const mapStateToProps = (state) => {
  return {
    data: state.Genre.data,
    currentPage: state.Genre.currentPage,
    total: state.Genre.total,
    totalPage: state.Genre.totalPage,
    keyword: state.Genre.keyword,
  };
};

export default connect(mapStateToProps)(withRouter(Genres));
