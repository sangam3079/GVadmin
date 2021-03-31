import React from 'react'
import { Avatar,Table,Button,Typography,Tag, Divider } from 'antd';
import { CheckCircleTwoTone,CloseCircleTwoTone, CheckCircleOutlined, CloseCircleOutlined,AndroidFilled, AppleFilled } from '@ant-design/icons';
import JSONPretty from 'react-json-pretty';

const { Text } = Typography;


const SubscriptionDetails = ({subscriptionData}) => {
    const subscriber = subscriptionData || {};
    const { id, purchase_token, product_id, order_id,updated_at,package_name,purchase_time,
            transaction_date, transaction_id, subs,created_at, days_until_expiry,expiry_date,device,
            transaction_date_utc,cancelled_at, user, receipt,} = subscriptionData;


    console.log(subscriptionData);

    return(
        <>
            <div className="subscriberInfoDrawer">
                <h3 className="border-bottom">Subscriber Info</h3>
                <p>
                    Name : {user && user.name || "N/A"}
                </p>
                <p>
                    Email : {user && user.email || "N/A"}
                </p>
                <p>
                    Device : <Tag icon={(device === 'android') ? <AndroidFilled /> : <AppleFilled /> } 
                                color="green"
                            >
                                {device} 
                            </Tag>
                </p>
               
                <br/>

                <h3 className="border-bottom">Product/Package</h3>

                
                {/* <p>
                    Package Name : {package_name || 'N/A'}
                </p> */}

              

                <p>
                    Product Id : <Tag>{product_id}</Tag>
                </p>
                <p>
                    Order Id : <Tag>{order_id}</Tag>
                </p>

                <p>
                    Transaction Id : <Tag >{transaction_id}</Tag>
                </p>

                <p>
                    Subscription Plan : <Tag color="blue">{subs}</Tag>
                </p>

                <p className="f-weight-600 text-light-dark">
                    Days Until Expiry : {
                                            days_until_expiry<10 ?  <Tag color="#D54241" className="border-radius-50">{days_until_expiry}</Tag> :
                                                                    <Tag color="#40A9FF" className="border-radius-50">{days_until_expiry}</Tag>
                                        }
                </p>

                <p>
                    Expiry Date : {expiry_date}
                </p>

               

                <p>
                    Purchase Token : {purchase_token}
                </p>

                <p>
                    Purchase Time: {purchase_time}
                </p>
               
                <p>
                    Created At : {created_at }
                </p>

                <p>
                   Transaction Date : {transaction_date_utc}
                </p>

                <p>
                    Updated At : {updated_at}
                </p>

                {cancelled_at?<p>Cancelled At : {cancelled_at}</p>:null}
                
               
               
                <p>
                    Receipt:
                    <JSONPretty id="json-pretty" data={receipt}></JSONPretty>
                </p>

            </div>
        </>
    )

}

export default SubscriptionDetails;
