import React from 'react'
import ChartistGraph from 'react-chartist'
//import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import style from './style.module.scss'


class WidgetCard extends React.Component {
    static defaultProps = {
      chartProps: {},
      title: '',
      amount: '',
    }

    
      
  
    render() {

        var data = {
            series: [[2, 11, 8, 14, 18, 20, 26]],
        };
        
        var options = {
                axisX: {
                showLabel: false,
                showGrid: false,
                offset: 0,
                },
                axisY: {
                showLabel: false,
                showGrid: false,
                offset: 0,
                },
                showArea: true,
                high: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                },
                chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                },
                fullWidth: true,
                height: '110px',
                showPoint: true,
                
            };

        const { chartProps, title, amount} = this.props
        return (
            <div className={`card ${style.card}`}>
            {chartProps && (
                <div className={style.chart}>
                <ChartistGraph
                    {...chartProps}
                    data={data}
                    options={options}
                    type="Line"
                    className={'ct-octave'} 
                />
                </div>
            )}
            {amount && <div className={style.amount}>{amount}</div>}
            {title && <div className={style.title}>{title}</div>}
            </div>
        )
    }
  }
  
  export default WidgetCard
  