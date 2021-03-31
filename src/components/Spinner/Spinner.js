import React from 'react'
import { Spin } from 'antd'
import 'antd/dist/antd.css';


const Spinner = () => {
    return (
        <div style={{position:'relative', top:'50%', left:'50%'}}>
            <Spin />
            <p style={{marginLeft: '-45px'}}>Loading, please wait</p>
        </div>
    )
}

export default Spinner