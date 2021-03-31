import React, {useState, useEffect} from 'react'
import 'antd/dist/antd.css';
import { Button, Divider, Modal, Input, Switch} from 'antd'
import Spinner from '../../components/Spinner/Spinner'
import Header from '../../components/Header/Header'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import CustomLayout from '../../components/CustomLayout/CustomLayout'
import { PlusCircleFilled  } from '@ant-design/icons';
import AntTable from 'cleanComponents/Table/Table'
import Can from 'config/can'

import { 
    getAllCompositions, 
    // deleteComposition,
    updateComposition,
} from 'services/composition';

import { 
        // setComposition, 
        // setCompositionKeyword, 
        setCompositionCurrentpage,
    } from 'store/actions/Composition/CompositionAction';




const Composers = React.memo(({
    history, 
    dispatch, 
    data, 
    total, 
    keyword, 
    currentPage
    }) => { 

    const {confirm} = Modal;
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    let [switchLoading, setSwitchLoading] = useState(false);

    const [dateFilter, setDateFilter] = useState({});
    const [genreFilter, setGenreFilter] = useState();
    const [sort, setSort] = useState({});
    
   
    const fetchComposers = (pageParam, filterParam, sortParam) => { 
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
        console.log(params);
        setFetching(true);
        dispatch(getAllCompositions({params,callback : compositionFetchCallback}))
    }

    const compositionFetchCallback = () => {
        setLoading(false);
        setFetching(false);
    }

    const compositionCallback = ()=>{
        setFetching(false);
    }
    
    const handleTableChange = (pagination, filter, sorter) => {
        if(pagination.current !== currentPage){
            
            dispatch(setCompositionCurrentpage(pagination.current))
        }

        // if(sorter){
        //     // console.log(sorter);
        //     let new_sort = getSorterObject(sorter, sort)
        //     console.log(new_sort)
        //     setSort(new_sort);
        // }

    }

    useEffect(()=>{
        fetchComposers();
    }, [history.location.pathname])

    useEffect(() => {
        fetchComposers();
    }, [keyword, dateFilter, genreFilter, sort, currentPage])

    const handlePublishToggle = (id,value) => {
        console.log(value);
        let status;

        if(value === true){
            status='published';
        }else{
            status='unpublished';
        }

        let body = {
            status : status,
        }

        setFetching(true);
        
        dispatch(updateComposition({id, body, callback : compositionCallback}))
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'title',
          key: 'name',
        },
        {
            title: 'Number of Tracks',
            dataIndex: 'composition_tracks',
            key: 'composition_tracks',
            render: (composition_tracks)=>{
                        return composition_tracks.length;
                    }
          },
        {
          title: 'Created By',
          dataIndex: 'composer',
          key: 'composer',
          render: (composer)=>{
                    return composer.full_name;
                }
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
        },
        {
            title: 'Played Count',
            dataIndex: 'played_count',
            key: 'played_count',
        },
        {
            title : 'Publish Status',
            dataIndex : 'status',
            render : (text,record,index) => {
                let published;
                if(text==="published"){
                    published=true;
                }else{
                    published=false;
                }

                let row=record;
                console.log('published?',published);

                return (
                    <Can I='edit' a='customer' passThrough>
                        {
                            can => {
                                return <Switch 
                                            title={published ? 'Composition is published, Switch to unpublish' : 'Composition is unpublished, Switch to publish'}
                                            checked={published}
                                            onChange={(value)=>handlePublishToggle(row.id, value)}
                                            loading={switchLoading}
                                            checkedChildren="Published"
                                            unCheckedChildren="Unpublished"
                                            disabled={!can}
                                        />
                            }
                        }
                    </Can>
                )
            }
        },
    ];

    const handleClick = () => {
        // dispatch(setCustomer({}));
        history.push('/Composers/new')
    }

    const renderConditionally = () => {
        if(loading){
            return (
                <CustomLayout sidebarSelectionKey="composers">
                    <Spinner />
                </CustomLayout>
            )
        }else{
            return (
                <CustomLayout sidebarSelectionKey="composers">
                    <div style={{width : '100%'}} className="card">
                        
                        {/* <Header 
                            button={
                            <Can I="create" a="customer" passThrough>
                                {
                                    can => (
                                        <Button type="primary" onClick={handleClick} disabled={!can}><span className="px-2"><PlusCircleFilled /></span>New Composer</Button>
                                    )
                                }
                            </Can>
                            } 
                        /> */}

                        <div className="card-body">
                        <AntTable 
                            dataSource={data} 
                            columns={columns}
                            pagination={{pageSize : 10, total:total,  showSizeChanger : false, current : currentPage}}
                            loading={fetching}
                            onChange={handleTableChange}
                        />
                        </div>
                    </div>
                </CustomLayout>
            )
        }
    }
    return(renderConditionally())
})

const mapStateToProps = state => {
    return {
        data : state.Composition.data,
        currentPage : state.Composition.currentPage,
        // keyword : state.Composition.keyword,
        totalPage : state.Composition.totalPage,
        total : state.Composition.total
    }
}

export default connect(mapStateToProps)(withRouter(Composers))