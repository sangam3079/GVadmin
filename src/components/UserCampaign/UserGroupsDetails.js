import React from 'react'
import {Tabs, Typography,Tag} from 'antd'
import { CheckCircleTwoTone,CloseCircleTwoTone, CheckCircleOutlined, CloseCircleOutlined,AndroidFilled, AppleFilled } from '@ant-design/icons';
import JSONPretty from 'react-json-pretty';


const { TabPane } = Tabs;

const {Text} = Typography;

const UserGroupsDetails = ({userGroupsData}) => {

    const userGroups = userGroupsData || {};
    const { id, title, user_ids, users, created_at} = userGroupsData;


    console.log(userGroupsData);

    return (
        <>
            <div >
            <h3 className="border-bottom">User Groups Info</h3>
            <p>
                Group Title : {userGroupsData.title}
            </p>
            <p>
                Created At : {created_at}
            </p>
            

            <br/>

            <h3 className="border-bottom">User Details</h3>
            
            <p>
                User Id :{user_ids}
            </p>
            <p>
                User Email :{ "N/A"}
            </p>
            <p>
                User Name :{ "N/A"}
            </p>
            </div>
        </>
    )
}

export default UserGroupsDetails
