import React, {useState, useEffect} from 'react'
import CustomLayout from '../CustomLayout/CustomLayout'
import Header from '../Header/Header'
import {connect } from 'react-redux'
import { Button, Divider, Modal, Input} from 'antd'
import Spinner from '../Spinner/Spinner'
import {withRouter} from 'react-router-dom'
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusCircleFilled, SearchOutlined} from '@ant-design/icons'
import { getAllCategories, deleteCategory } from 'services/category'
import { setCategory, setCategoryKeyword, setCategoryCurrentpage } from 'store/actions/Category/CategoryAction'
import AntTable from 'cleanComponents/Table/Table'
import { getSorterObject } from 'utils/helpers'

const Category = ({history, dispatch, data, total, keyword, currentPage}) => {
    const {confirm} = Modal;
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [prevSearchKeyword, setPrevSearchKeyword] = useState(undefined);
    const [dateFilter, setDateFilter] = useState({});
    const [genreFilter, setGenreFilter] = useState();
    const [sort, setSort] = useState({});
    // const [currentPage, setCurrentPage] = useState(1);

    const fetchCategories = (pageParam, filterParam, sortParam) => { 

        setPrevSearchKeyword(keyword);

        console.log('Category',pageParam, filterParam, sortParam);
        let defaultFilter = {
            keyword,
            date_from : dateFilter.date_from,
            date_to : dateFilter.date_to,
            genre : genreFilter
        }
        let params = {
            page : pageParam || currentPage,
            per_page : '10',
            filter : filterParam || defaultFilter,
            sort : sortParam || sort
        }
        setFetching(true);
        dispatch(getAllCategories({params,callback : handleCategoryFetchCallback, prevSearchKeyword}))
    }

    const handleCategoryFetchCallback = () => {
        setLoading(false);
        setFetching(false);
    }

    const handleTableChange = (pagination, filter, sorter) => {
        if(pagination.current !== currentPage){
            // fetchCategories(pagination.current);
            // setCurrentPage(pagination.current);
            dispatch(setCategoryCurrentpage(pagination.current))
        }

        if(sorter){
            // console.log(sorter);
            let new_sort = getSorterObject(sorter, sort)
            console.log(new_sort)
            setSort(new_sort);
        }

    }

    function showDeleteConfirm(id) {
        confirm({
          title: 'Are you sure delete this track?',
          icon: <ExclamationCircleOutlined />,
          content: 'This action cannot be undone.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteTrack(id)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    const editCategory = id => {
        let category_arr = [...data];
        let category = {}
        category_arr.forEach((c, index) => {
            if(c.id === id){
                category = c;
            }
        })
        dispatch(setCategory(category));
        history.push(`/categories/${id}/edit`);
    }

    const deleteTrack = id => {
            setFetching(true);
            dispatch(deleteCategory({id, callback : handleCustomerDeleteCallback}))
    }

    const handleCustomerDeleteCallback = () => {
        setFetching(false);
    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown : ({}) => (
            <div style={{padding : 8}}>
                <Input
                    name={dataIndex}
                    Placeholder={`Search ${dataIndex}`}
                    value={genreFilter}
                    onChange={e => setGenreFilter(e.target.value)}
                    style={{width : 188, marginBottom : 8, display : 'block'}}
                />
                <Button onClick={() => {
                    setGenreFilter(undefined)
                }}>
                    Clear
                </Button>
            </div>
        ),
        filterIcon : filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }}/>
    })

    const navigate = () => {
        dispatch(setCategory({}))
        history.push('/categories/new');
    }

    useEffect(()=>{
        fetchCategories();
    }, [history.location.pathname])

    const columns = [
        {
            title : 'Name',
            dataIndex : 'name',
            key : 'name',
            sorter : true
        },
        {
            title : 'Genre',
            dataIndex : 'genre',
            key : 'genre',
            ...getColumnSearchProps('genre'),
            render : (genre) => {
                return <span className="text-capitalize">{genre ? genre.name : ''}</span>
            }
        },
        {
            title : 'Track Count',
            dataIndex : 'track_count',
            key : 'track_count'
        },
        {
            title : 'Created Date',
            dataIndex : 'created_at',
            key : 'created_at',
            sorter : true
        },
        {
            title : 'Options',
            dataIndex : 'options',
            key : 'options',
            render : (record, row) => {
                return(
                    <div>
                        <EditOutlined 
                            // style={{color : 'blue'}} 
                            onClick={()=>editCategory(row.id)}
                            title="Edit category"
                            className="text-primary"
                            />
                        <Divider type="vertical" />
                        <DeleteOutlined 
                            // style={{color : 'red'}} 
                            onClick={()=>showDeleteConfirm(row.id)}
                            title="Delete category"
                            className="text-danger"
                            />
                    </div>
                )
            }
        },
    ]

    const handleKeywordFilter = value => {
        // setCurrentPage(1)
        // setKeyword(value);
        dispatch(setCategoryKeyword(value))
    }

    const handleDateFilter = value => {
        // setCurrentPage(1);
        setDateFilter(value);
    }

    useEffect(() => {
        fetchCategories();
    }, [keyword, dateFilter, genreFilter, sort, currentPage])

    const renderConditionally = () => {
        if(loading){
            return(
                <CustomLayout sidebarSelectionKey="category">
                    <Spinner />
                </CustomLayout>
            )
        }else{
            return(
                <CustomLayout sidebarSelectionKey="category">
                <div className="card">
                    <Header 
                        handleDateFilter={handleDateFilter}
                        keywordValue={keyword}
                        handleKeywordFilter={handleKeywordFilter}
                        // title="Categories" 
                        button={<Button onClick={navigate} type="primary"><span className="px-2"><PlusCircleFilled /></span>New Category</Button>}
                        // subtitle="List of all categories"
                        />
                    <div className="card-body">
                    <div style={{width : '100%'}}>
                    <AntTable 
                        columns={columns} 
                        dataSource={data}
                        pagination={{pageSize : 10, total : total,  showSizeChanger : false, current : currentPage}}
                        loading={fetching}
                        onChange={handleTableChange}
                        />
                </div>
                    </div>
                </div>
            </CustomLayout>
            )
        }
    }

    return(renderConditionally())
}

const mapStateToProps = state => {
    return {
        data : state.Category.data,
        currentPage : state.Category.currentPage,
        keyword : state.Category.keyword,
        totalPage : state.Category.totalPage,
        total : state.Category.total
    }
}

export default connect(mapStateToProps)(withRouter(Category))