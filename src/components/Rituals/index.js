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
import { getAllRitual, deleteRitual } from 'services/ritual';
import {
  setARitual,
  setRitualCurrentpage,
  setRitualKeyword,
} from 'store/actions/Ritual/RitualAction';

const RitualListing = ({
  dispatch,
  data,
  total,
  history,
  keyword,
  currentPage,
}) => {
  const [fetching, setFetching] = useState(true);
  // const [keyword, setKeyword] = useState('');
  const [prevRitualKeyword, setPrevRitualKeyword] = useState(undefined);

  const [dateFilter, setDateFilter] = useState({});
  const [sort, setSort] = useState({});
  // const [currentPage, setCurrentPage] = useState(1)
  const { confirm } = Modal;
  function showDeleteConfirm(id) {
    confirm({
      title: 'Are you sure delete this Ritual?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // console.log('OK');
        deleteThisRitual(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleDeleteCallback = () => {
    setFetching(false);
  };

  const deleteThisRitual = (id) => {
    setFetching(true);
    dispatch(deleteRitual({ id, callback: handleDeleteCallback }));
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
              onClick={() => editRitual(row.id)}
              title='Edit Ritual'
            />
            <Divider type='vertical' />
            <DeleteOutlined
              className='text-danger'
              onClick={() => showDeleteConfirm(row.id)}
              title='Delete Ritual'
            />
          </div>
        );
      },
    },
  ];

  const editRitual = (id) => {
    let Ritual = data.filter((el) => el.id === id)[0];
    dispatch(setARitual(Ritual));
    history.push(`/rituals/${id}/edit`);
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    // console.log(value)
  };

  const handleKeywordFilter = (value) => {
    // setKeyword(value)
    dispatch(setRitualKeyword(value));
    console.log(value);
  };

  const navigateNewRitual = () => {
    console.log('wassip');
    history.push(`/rituals/new`);
  };

  const handleTableChange = (pagination, filter, sorter) => {
    if (pagination.current !== currentPage) {
      // setCurrentPage(pagination.current)
      dispatch(setRitualCurrentpage(pagination.current));
    }
    if (sorter) {
      const new_sort = getSorterObject(sorter);
      setSort(new_sort);
    }
  };

  const handleFetchAllRitualCallback = () => {
    setFetching(false);
  };

  const fetchRitual = (pageParam, filterParam, sortParam) => {
    setPrevRitualKeyword(keyword);

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
      getAllRitual({
        params,
        callback: handleFetchAllRitualCallback,
        prevRitualKeyword,
      })
    );
  };

  useEffect(() => {
    fetchRitual();
  }, [keyword, dateFilter, sort, currentPage]);

  return (
    <CustomLayout sidebarSelectionKey='rituals'>
      <div class='card'>
        <Header
          handleDateFilter={handleDateFilter}
          handleKeywordFilter={handleKeywordFilter}
          keywordValue={keyword}
          button={
            <Button onClick={navigateNewRitual} type='primary'>
              <span className='px-2'>
                <PlusCircleFilled />
              </span>
              New Ritual
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
  // console.log('at map',state.Ritual.total)
  return {
    data: state.Ritual.data,
    total: state.Ritual.total,
    currentPage: state.Ritual.currentPage,
    keyword: state.Ritual.keyword,
  };
};

export default connect(mapStateToprops)(withRouter(RitualListing));
