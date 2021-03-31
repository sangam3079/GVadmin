import React, {useContext} from 'react'
import {Dropdown, Menu, Avatar, Badge} from 'antd';
import {UserContext} from 'contexts/UserContext';
import {Link, withRouter} from 'react-router-dom';
import cookie from 'utils/cookie';
import { SettingOutlined, LogoutOutlined , UserOutlined, CaretDownFilled} from '@ant-design/icons';
import styles from './profile.module.scss'

const DropDownMenu = ({history}) => {
    const handleLogOut = (e) => {
        // console.log('i was called', history)
        e.preventDefault();
        // logout()
        cookie.clearAll();
        history.push('/auth');
    }
    const {currentUser} = useContext(UserContext);
    // console.log(currentUser);
    const menu = (
        <Menu selectable={false}>
            <Menu.Item>
                <Link to="/settings">
                    <SettingOutlined className={`${styles.menuIcon} icmn-user`}/> <span>Settings</span> 
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="#" onClick={handleLogOut}>
                <LogoutOutlined className={`${styles.menuIcon} icmn-user`}/> <span>Log out</span> 
                </Link>
            </Menu.Item>
        </Menu>
    )
    return (
        <>
        <Dropdown overlay={menu} trigger={[`click`]}>
            <div className={styles.dropdown}>
                <Badge>
                <span style={{paddingRight: '15px'}}>{currentUser.full_name || currentUser.email}</span>
                    <Avatar shape="square" size="large" icon={<UserOutlined/>} style={{cursor: 'pointer'}} className={styles.Avatar}/> 
                </Badge>
            </div>
        </Dropdown>
        </>
    )
}

export default withRouter(DropDownMenu)