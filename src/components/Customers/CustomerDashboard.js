import React ,{ useState,useContext} from 'react'
import InfoCard from '../../cleanComponents/ChartCard'
import { UserContext } from 'contexts/UserContext'


function CustomerDashboard() {
    const [loading, updateLoading] = useState(true),
		[data, setData] = useState([]),
		{ currentUser, metrics } = useContext(UserContext)

    return (
        
        <div className="row">
            <div className="col-sm-3">
            <InfoCard title="Total Customers" amount={metrics.customers_count} />
            </div>
            <div className="col-sm-3">
            <InfoCard title="Total Subscribers" amount={metrics.subscribers_count}/>
            </div>
            <div className="col-sm-3">
            <InfoCard title="Yearly Subs" amount={metrics.yearly_subscriber ? metrics.yearly_subscriber : '0'} />
            </div>
            <div className="col-sm-3">
            <InfoCard title="Monthly Subs" amount={ metrics.monthly_subscribers}/>
            </div>
            
        </div>
        
    )
}

export default CustomerDashboard
