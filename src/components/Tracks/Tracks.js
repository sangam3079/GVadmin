import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Divider, Modal, Input, message } from 'antd';
import Header from '../Header/Header';
import CustomLayout from '../CustomLayout/CustomLayout';
import Spinner from '../Spinner/Spinner';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  PlusCircleFilled,
  DownloadOutlined,
  PlaySquareOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { getAllTracks, deleteTrack } from 'services/tracks';
import AntTable from 'cleanComponents/Table/Table';
import {
  setTrack,
  setTrackCurrentpage,
  setTrackKeyword,
} from 'store/actions/Tracks/TrackActions';
import Placeholder from 'assets/images/placeholder-image.png';
import { getSorterObject, removeUndefinedFromObject } from 'utils/helpers';
import { apiEndpoint } from 'services/constants';
import { urlWithParams, getApiCall } from 'services/url';

const Tracks = ({ history, dispatch, data, total, currentPage, keyword }) => {
  const { confirm } = Modal;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // const [data, setData] = useState([]);

  // const [filter, setFilters] = useState({});
  const [sort, setSort] = useState({});
  const [prevSearchKeyword, setPrevSearchKeyword] = useState();
  const [dateFilter, setDateFilter] = useState({});
  const [genreFilter, setGenreFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (!data.length) {
      fetchTrack();
    } else {
      // setData(tracks)
      fetchAllTrackCallback();
    }
  }, [history.location.pathname]);

  // useEffect(() => {
  //     setData(tracks)
  // }, [tracks])

  // useEffect(() =>{
  //     fetchTrack()
  // },[currentPage, sort])

  function showDeleteConfirm(id) {
    confirm({
      title: 'Are you sure delete this track?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteThisTrack(id);
      },
      onCancel() {},
    });
  }

  const setTableFilter = (e) => {
    // console.log(e.target.name, e.target.value);
    let { name, value } = e.target;
    if (name === 'genre') {
      setGenreFilter(value);
    } else if (name === 'category') {
      setCategoryFilter(value);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //     this.searchInput = node;
          // }}
          name={dataIndex}
          Placeholder={`Search ${dataIndex}`}
          value={
            dataIndex === 'genre'
              ? genreFilter
              : dataIndex === 'category'
              ? categoryFilter
              : undefined
          }
          onChange={(e) => setTableFilter(e)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          onClick={() => {
            clearTableFilter(dataIndex);
          }}
        >
          Clear
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    render: (text) => {
      return text || 'i am supposed to rendered';
    },
  });

  const clearTableFilter = (index) => {
    if (index === 'genre') {
      setGenreFilter(undefined);
    } else if (index === 'category') {
      setCategoryFilter(undefined);
    }
  };

  const handleGenreChange = (value) => {
    //   console.log(value);
    const params = {
      filter: { genre: value ? value.label[0] : undefined },
    };
    setGenreFilter(value ? value.label[0] : undefined);
    if (value) {
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
    } else {
      setCategoryData([]);
    }
  };

  const handleCategoryChange = (value) => {
    if (value) {
      setCategoryFilter(value.label);
    } else {
      setCategoryFilter(undefined);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'track_image',
      render: (url, row) => {
        return (
          <img
            src={url || Placeholder}
            alt={row.name}
            className='image-table'
            loading='lazy'
            width='50px'
          />
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (title, row) => {
        return (
          <span>
            {title} {row.track_code ? `(${row.track_code})` : ''}{' '}
          </span>
        );
      },
    },
    {
      title: 'Stats',
      dataIndex: 'download_count',
      key: 'stats',
      render: (stat, row) => {
        return (
          <>
            <p>
              <DownloadOutlined className='px-1' title='Download count' />{' '}
              {stat}
            </p>
            <p>
              <PlaySquareOutlined className='px-1' title='Play count' />{' '}
              {row.play_count}
            </p>
          </>
        );
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Genre',
      dataIndex: 'category',
      key: 'genre',
      // ...getColumnSearchProps('genre'),
      render: (category) => {
        return (
          <span>
            {category ? (category.genre ? category.genre.name : '-') : '-'}
          </span>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      // ...getColumnSearchProps('category'),
      render: (category) => {
        return <span>{category ? category.name : '-'}</span>;
      },
    },
    {
      title: 'Listed',
      dataIndex: 'unlisted',
      key: 'unlisted',
      filters: [
        { text: 'listed', value: false },
        { text: 'unlisted', value: true },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.unlisted === value,
      render: (unlisted) => {
        return !unlisted ? '√' : '✕';
      },
    },
    {
      title: 'Created date',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
    },
    {
      title: 'Options',
      render: (record, row) => {
        return (
          <div>
            <EditOutlined
              // style={{color : 'blue'}}
              className='text-primary'
              onClick={() => editTrack(row.id)}
              title='Edit track'
            />
            <Divider type='vertical' />
            <DeleteOutlined
              // style={{color : 'red'}}
              className='text-danger'
              onClick={() => showDeleteConfirm(row.id)}
              title='Delete track'
            />
          </div>
        );
      },
    },
  ];

  const handleDateFilter = (value) => {
    // setCurrentPage(1)
    setDateFilter(value);
  };

  const handleKeywordFilter = (value) => {
    // setCurrentPage(1)
    // setKeyword(value)
    dispatch(setTrackKeyword(value));
  };

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination.current !== currentPage) {
      // setCurrentPage(pagination.current);
      // fetchTrack(pagination.current);
      dispatch(setTrackCurrentpage(pagination.current));
    }
    if (sorter) {
      let new_sort = getSorterObject(sorter, sort);
      setSort(new_sort);
    }
  };

  const navigate = () => {
    dispatch(setTrack({}));
    history.push('/tracks/new');
  };

  const fetchTrack = (pageParam, filterParam, sortParam) => {
    setPrevSearchKeyword(keyword);

    let defaultFilter = removeUndefinedFromObject({
      keyword,
      date_from: dateFilter.date_from,
      date_to: dateFilter.date_to,
      category: categoryFilter,
      genre: genreFilter,
    });
    let params = {
      page: pageParam || currentPage,
      per_page: 10,
      filter: filterParam || defaultFilter,
      sort: sortParam || sort,
    };
    setFetching(true);
    dispatch(
      getAllTracks({
        callback: fetchAllTrackCallback,
        params,
        prevSearchKeyword,
      })
    );
  };

  const deleteThisTrack = (id) => {
    setFetching(true);
    dispatch(deleteTrack({ id, callback: () => setFetching(false) }));
  };

  const editTrack = (id) => {
    let track = data.filter((track) => track.id === id)[0];
    dispatch(setTrack(track));
    history.push(`/tracks/${id}/edit`);
  };

  const fetchAllTrackCallback = () => {
    setLoading(false);
    setFetching(false);
  };

  useEffect(() => {
    fetchTrack();
  }, [keyword, dateFilter, genreFilter, categoryFilter, sort, currentPage]);

  const render = () => {
    if (loading) {
      return (
        <CustomLayout sidebarSelectionKey='tracks'>
          <Spinner />
        </CustomLayout>
      );
    } else {
      return (
        <CustomLayout sidebarSelectionKey='tracks'>
          <div className='card'>
            <Header
              handleDateFilter={handleDateFilter}
              handleKeywordFilter={handleKeywordFilter}
              // title="Tracks"
              // subtitle="List of all tracks"
              keywordValue={keyword}
              categoryData={categoryData || []}
              handleCategoryChange={handleCategoryChange}
              handleGenreChange={handleGenreChange}
              button={
                <Button onClick={navigate} type='primary'>
                  <span className='px-2'>
                    <PlusCircleFilled />
                  </span>
                  New Track
                </Button>
              }
            />
            <div className='card-body'>
              <AntTable
                columns={columns}
                dataSource={data}
                pagination={{
                  pageSize: 10,
                  total: total,
                  current: currentPage,
                  showSizeChanger: false,
                }}
                onChange={handleTableChange}
                loading={fetching}
              />
              {/* {console.log(data)} */}
            </div>
          </div>
        </CustomLayout>
      );
    }
  };
  return render();
};

const mapStateToProps = (state) => {
  return {
    data: state.Track.data,
    currentPage: state.Track.currentPage,
    total: state.Track.total,
    keyword: state.Track.keyword,
  };
};

export default connect(mapStateToProps)(withRouter(Tracks));
