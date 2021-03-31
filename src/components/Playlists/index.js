import React, { useState, useEffect } from 'react';
import CustomLayout from 'components/CustomLayout/CustomLayout';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'components/Header/Header';
import { Button, Divider, Modal } from 'antd';
import AntTable from 'cleanComponents/Table/Table';
import placeholder from 'assets/images/placeholder-image.png';
import {
  PlusCircleFilled,
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { getSorterObject } from 'utils/helpers';
import { getAllPlayList, deletePlaylist } from 'services/playlist';
import {
  setAPlaylist,
  setPlaylistCurrentpage,
  setPlaylistKeyword,
} from 'store/actions/Playlist/PlaylistAction';

const PlaylistListing = ({
  dispatch,
  data,
  total,
  history,
  keyword,
  currentPage,
}) => {
  const [fetching, setFetching] = useState(true);
  // const [keyword, setKeyword] = useState('');
  const [prevPlaylistKeyword, setPrevPlaylistKeyword] = useState(undefined);

  const [dateFilter, setDateFilter] = useState({});
  const [sort, setSort] = useState({});
  // const [currentPage, setCurrentPage] = useState(1)
  const { confirm } = Modal;
  function showDeleteConfirm(id) {
    confirm({
      title: 'Are you sure delete this playlist?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // console.log('OK');
        deleteThisPlaylist(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleDeleteCallback = () => {
    setFetching(false);
  };

  const deleteThisPlaylist = (id) => {
    setFetching(true);
    dispatch(deletePlaylist({ id, callback: handleDeleteCallback }));
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image_standard',
      key: 'img',
      render: (img) => <img src={img || placeholder} className='image-table' />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Playable Count',
      dataIndex: 'playables_count',
      key: 'playable_count',
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      render: (record, row) => {
        return (
          <div>
            <EditOutlined
              className='text-primary'
              onClick={() => editPlaylist(row.id)}
              title='Edit Playlist'
            />
            <Divider type='vertical' />
            <DeleteOutlined
              className='text-danger'
              onClick={() => showDeleteConfirm(row.id)}
              title='Delete Playlist'
            />
          </div>
        );
      },
    },
  ];

  const editPlaylist = (id) => {
    let playlist = data.filter((el) => el.id === id)[0];
    dispatch(setAPlaylist(playlist));
    history.push(`/playlists/${id}/edit`);
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    // console.log(value)
  };

  const handleKeywordFilter = (value) => {
    // setKeyword(value)
    dispatch(setPlaylistKeyword(value));
    console.log(value);
  };

  const navigateNewPlaylist = () => {
    console.log('wassip');
    history.push(`/playlists/new`);
  };

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination.current !== currentPage) {
      // setCurrentPage(pagination.current)
      dispatch(setPlaylistCurrentpage(pagination.current));
    }
    if (sorter) {
      const new_sort = getSorterObject(sorter);
      setSort(new_sort);
    }
  };

  const handleFetchAllPlaylistCallback = () => {
    setFetching(false);
  };

  const fetchPlaylist = (pageParam, filterParam, sortParam) => {
    setPrevPlaylistKeyword(keyword);

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
      getAllPlayList({
        params,
        callback: handleFetchAllPlaylistCallback,
        prevPlaylistKeyword,
      })
    );
  };

  useEffect(() => {
    fetchPlaylist();
  }, [keyword, dateFilter, sort, currentPage]);

  return (
    <CustomLayout sidebarSelectionKey='playlists'>
      <div class='card'>
        <Header
          handleDateFilter={handleDateFilter}
          handleKeywordFilter={handleKeywordFilter}
          keywordValue={keyword}
          button={
            <Button onClick={navigateNewPlaylist} type='primary'>
              <span className='px-2'>
                <PlusCircleFilled />
              </span>
              New Playlist
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
};

const mapStateToprops = (state) => {
  // console.log('at map',state.Playlist.total)
  return {
    data: state.Playlist.data,
    total: state.Playlist.total,
    currentPage: state.Playlist.currentPage,
    keyword: state.Playlist.keyword,
  };
};

export default connect(mapStateToprops)(withRouter(PlaylistListing));
