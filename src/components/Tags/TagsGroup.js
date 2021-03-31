import React, {useEffect, useState} from 'react'
import Header from 'components/Header/Header'
import {Button, Divider, Modal} from 'antd'
import AntTable from 'cleanComponents/Table/Table'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { PlusCircleFilled, EditOutlined, DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import {getAllTagsGroup, deleteTagGroup} from 'services/tagsGroup'
import placeholder from 'assets/images/placeholder-image.png'
import { setATagGroup, setTagGroupKeyword, setTagGroupCurrentpage } from 'store/actions/Tags/TagsAction'


const TGroup = ({data, dispatch, total, history, keyword, currentPage}) => {

    // const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    // const [keyword, setKeyword] = useState()
    const [prevTagsGroupSearch, setPrevTagsGroupSearch] = useState()

    


    const fetchData = () => {
        const defaultFilter = {keyword};

        setPrevTagsGroupSearch(keyword);

        const params = {
            per_page : 10,
            page : currentPage,
            filter : defaultFilter
        }
        setFetching(true);
        dispatch(getAllTagsGroup({params, callback : setFetching(false), prevTagsGroupSearch}))

    }

    const deleteThisTagGroup = id => {
        setFetching(true);
        dispatch(deleteTagGroup({id, callback : ()=>setFetching(false)}))
    }

    const {confirm} = Modal

    function showDeleteConfirm(id) {
        confirm({
          title: 'Are you sure delete this track?',
          icon: <ExclamationCircleOutlined />,
          content: 'This action cannot be undone.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteThisTagGroup(id)
          },
          onCancel() {
          },
        });
      }

    useEffect(()=>{
        fetchData()
    }, [currentPage, keyword])

    const handleKeywordFilter = value => {
        // console.log(value);
        // setKeyword(value);
        dispatch(setTagGroupKeyword(value))
    }

    const navigateToNewTagGroup = () => {
        dispatch(setATagGroup({}))
        console.log('oka');
        history.push('/tags-group/new')
    }

    const navigateEdit = row => {
        dispatch(setATagGroup(row))
        history.push(`/tags-group/${row.id}/edit`)
    }

    const handleTableChange = (pagination) => {
        if(pagination.current !== currentPage){
            // setCurrentPage(currentPage)
            dispatch(setTagGroupCurrentpage(pagination.current))
        }
    }

    const columns = [
        {
            title : 'Image',
            dataIndex : 'image_url',
            name : 'image',
            render : image => {
                return <img src={image || placeholder} className="image-table" /> 
            }
        },
        {
            title : 'Group',
            dataIndex : 'name',
            key : 'name'
        },
        {
            title : 'Action',
            render : (col, row) => {
                return(
                <div>
                    <EditOutlined 
                        className="text-primary"
                        onClick={()=>navigateEdit(row)}
                        title="Edit Tag group"
                    />
                    <Divider type="vertical" />
                    <DeleteOutlined 
                        className="text-danger"
                        onClick={() => showDeleteConfirm(row.id)}
                        title="Delete Tag group"
                    />
                </div>
                )
            }
        }
    ]

    const button = <Button onClick={navigateToNewTagGroup} type="primary" ><span className="px-2"><PlusCircleFilled /></span>New Tags Group</Button>

    return (
        <div className="card">
            <div className="card-header">
            <div className="utils__title text-uppercase">
                <strong>Tags group</strong>
            </div>
            </div>
            <Header 
                // title="Tags Group"
                // subtitle="List of all tags group"
                handleKeywordFilter={handleKeywordFilter}
                keywordValue={keyword}
                // handleDateFilter={handleDateFilter}
                button={button}
            />
            <div className="card-body">
                <AntTable 
                    columns={columns}
                    dataSource = {data}
                    pagination = {{pageSize : 10, total : total, current : currentPage, showSizeChange : false}}
                    // onChange={}
                    loading={fetching}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data : state.TagGroup.data,
        total : state.TagGroup.total,
        currentPage : state.TagGroup.currentPage,
        keyword : state.TagGroup.keyword
    }
}

export default connect(mapStateToProps)(withRouter(TGroup))