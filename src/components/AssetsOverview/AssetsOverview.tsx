import React from 'react'

import classes from './AssetsOverview.module.css'

// import { Link } from 'react-router-dom'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// import AssetsService from '../../services/assetsService'
import IAssetsData from 'models/AssetsModel'
import TAssetsReport from 'models/AssetsReportModel'

import AssetsReport from './AssetsReport/AssetsReport';


const AssetsOverview: React.FC<{assets: IAssetsData[]}> = props => {
    let [overview, setOverview] = React.useState<TAssetsReport>({
        totalAssets: 0, 
        assetsInOperation: 0, 
        assetsInAlert: 0, 
        assetsInDowntime: 0
    })
    let [initialMount, setInitialMount] = React.useState<boolean>(true)

    React.useEffect(() => {
        let newOverview = {...overview}

        newOverview.totalAssets = props.assets.length

        props.assets.forEach((asset: IAssetsData) => {
            if (asset.status === 'inOperation') {
                newOverview.assetsInOperation++
            }
            if (asset.status === 'inAlert') {
                newOverview.assetsInAlert++
            }
            if (asset.status === 'inDowntime') {
                newOverview.assetsInDowntime++
            }
        })

        if (props.assets.length > 0 && initialMount) {
            setInitialMount(false)
            setOverview(newOverview)
        }
        
    }, [overview, props.assets, initialMount])

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'rgb(245, 245, 245)'
          },
          title: {
            text: `Total: ${overview.totalAssets}`,
            y:200
          },
        legend:{
          enabled:true
        },
        plotOptions: {
        pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                dataLabels: {
                enabled: false
            }
        }
        },
        series: [{
            name: 'Assets',
            colorByPoint: true,
                innerSize: '70%',
            data: [{
                name: `Funcionando (${overview.assetsInOperation})`,
                color: 'green',
                y: overview.assetsInOperation,
            }, {
                name: `Em alerta (${overview.assetsInAlert})`,
                color: 'orange',
                y: overview.assetsInAlert
            }, {
                name: `Paradas (${overview.assetsInDowntime})`,
                color: 'red',
                y: overview.assetsInDowntime
            }]
        }]
    }


    return (
        <div className={classes['assetsOverview-container']}>
            <h1>ATIVOS</h1>
            <AssetsReport assetsReport={overview}/>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default AssetsOverview