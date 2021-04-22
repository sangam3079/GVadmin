import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {withRouter} from 'react-router-dom'
import ChartistGraph from 'react-chartist';
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import {connect} from 'react-redux'
import {userGrowth} from 'services/profile'
import style from './stylemodule.scss'


const CustomerChart = ({ data, dispatch }) => {
	const [growth, setGrowth] = useState({})
	const [loading, setLoading] = useState(false)

	// let d_data =  {
	// 	labels: [
	// 	  "2016",
	// 	  "2017",
	// 	  "2018",
	// 	  "2019",
	// 	  "2020"
	// 	],
	// 	series: [
	// 	  [5,2,4,2,5],
	// 	  [3,1,5,4,2],
	// 	]
	//   }
    

    const options = {
        chartPadding: {
          right: 40,
          left: 5,
          top: 0,
          bottom: 15,
        },
        fullWidth: true,
        showPoint: true,
        lineSmooth: true,
        axisY: {
          showGrid: true,
          showLabel: true,
          offset: 50,
        },
        axisX: {
          showGrid: false,
          showLabel: true,
          offset: 10,
        },
        
        showArea: false,
        
        plugins: [
          ChartistTooltip({
            anchorToPoint: false,
            appendToBody: true,
            seriesName: false,
          }),
          
        ], 
    }

	const fetchLogs = () => {
		setLoading(true);
		dispatch(userGrowth({callback : ()=>setLoading(false)}))
	};

	useEffect(()=>{
		if(!Object.keys(data).length){
			fetchLogs();
		}else{
			setLoading(false);
		}
	}, [data])

	useEffect(()=>{
		let labels = Object.keys(data);
		let series = [];
		let series_data = [];
		Object.keys(data).forEach(key =>{
			series_data.push(data[key])
		})
		series.push(series_data);
		let obj = {
			labels,
			series
		}
		setGrowth(obj);
	}, [data])

	if (loading) return <div>Loading...</div>
	return (
        <div className="col-lg-12">
            <div className={`card ${style.card}`}>
                <ChartistGraph
                    data={growth}
                // options ={{seriesBarDistance : 10}} 
                    options={options}
                    type="Line"
                    className="height-400 ct-hidden-points"
                    //className="chart-area height-300 mt-4 chartist"
                />
            </div>
        </div>
	)
}

CustomerChart.propTypes = {
	history: PropTypes.object
}

const mapStateToProps = state => {
	return {
		data : state.Profile.userGrowth
	}
}

export default connect(mapStateToProps)(withRouter(CustomerChart))