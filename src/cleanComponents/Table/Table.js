import React from 'react'
import {Table} from 'antd'
import {connect} from 'react-redux';

const AntTable = ({isMobileView, ...props}) => {
    return <Table 
        scroll={{x : true}}
        {...props}
    />
}

const mapStateToProps = state => {
    return {
        isMobileView : state.Sidebar.isMobileView
    }
}

export default connect(mapStateToProps)(AntTable)