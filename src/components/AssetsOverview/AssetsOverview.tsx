import { useState, useEffect } from "react"

import classes from "./AssetsOverview.module.scss"

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"


// import AssetsService from '../../services/assetsService'
import IAssetsData from "models/AssetsModel"
import TAssetsReport from "models/AssetsReportModel"

import AssetsOverviewCircle from "./AssetsOverviewCircle/AssetsOverviewCircle"


type Props = {
	assets: IAssetsData[]
}

const AssetsOverview = (props: Props) => {
	const {
		assets
	} = props

   const [overview, setOverview] = useState<TAssetsReport>({
      totalAssets: 0,
      assetsInOperation: 0,
      assetsInAlert: 0,
      assetsInDowntime: 0,
   })
   const [initialMount, setInitialMount] = useState<boolean>(true)

   useEffect(() => {
      const newOverview = { ...overview }

      newOverview.totalAssets = assets.length

      assets.forEach((asset: IAssetsData) => {
         if (asset.status === "inOperation") {
            newOverview.assetsInOperation++
         }
         if (asset.status === "inAlert") {
            newOverview.assetsInAlert++
         }
         if (asset.status === "inDowntime") {
            newOverview.assetsInDowntime++
         }
      })

      if (assets.length > 0 && initialMount) {
         setInitialMount(false)
         setOverview(newOverview)
      }
   }, [overview, assets, initialMount])

   const options = {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         type: "pie",
         backgroundColor: "#171932",
         margin: [0, 0, 0, 0],
         spacingTop: 0,
         spacingBottom: 0,
         spacingLeft: 0,
         spacingRight: 0,
         selectionMarkerFill: "none"
      },
      subtitle: {
         style: {
            color: '#fff'
         }
      },
      title: {
         text: `Total: ${overview.totalAssets}`,
         y: 200,
         style: {
            fontWeight: 900,
            color: '#fff'
         },
      },
      legend: {
         enabled: true,
         itemStyle: {
            color: '#fff',
            fontWeight: '100'
         }
      },
      plotOptions: {
         pie: {
            size: "70%",
            allowPointSelect: false,
            cursor: "pointer",
            showInLegend: true,
            dataLabels: {
               enabled: false,
               style: {
                  fontWeight: 500,
                  fontSize: 20 + "px",
                  color: '#fff'
               },
            },
         },
      },
      series: [
         {
            name: "Assets",
            colorByPoint: false,
            innerSize: "70%",
            slicedOffset: 0,
            data: [
               {
                  name: `Funcionando (${overview.assetsInOperation})`,
                  color: "green",
                  y: overview.assetsInOperation,
               },
               {
                  name: `Em alerta (${overview.assetsInAlert})`,
                  color: "orange",
                  y: overview.assetsInAlert,
               },
               {
                  name: `Paradas (${overview.assetsInDowntime})`,
                  color: "red",
                  y: overview.assetsInDowntime,
               },
            ],
            point: {
               events: {
                  legendItemClick: function () {
                     return false
                  },
               },
            },
         },
      ]
   }

   return (
      <div className={classes["AssetsOverview-container"]}>
         <h1>STATUS DOS ATIVOS</h1>
         <div className={classes["AssetsOverview-subContainer"]}>
            <AssetsOverviewCircle 
               text={'Funcionando'}
               color={'#38c2cb'}
               value={(overview.assetsInOperation / overview.totalAssets) * 100}
            />
            <AssetsOverviewCircle 
               text={'Em Alerta'}
               color={'orange'}
               value={(overview.assetsInAlert / overview.totalAssets) * 100}
            />
            <AssetsOverviewCircle 
               text={'Paradas'}
               color={'red'}
               value={(overview.assetsInDowntime / overview.totalAssets) * 100}
            />
         </div>
         <div className={classes["AssetsOverview-subContainer--mobile"]}>
            <HighchartsReact highcharts={Highcharts} options={options} />
         </div>
      </div>
   )
}

export default AssetsOverview
