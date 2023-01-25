import { useState, useEffect } from "react"

import classes from "./AssetsOverview.module.scss"

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// import AssetsService from '../../services/assetsService'
import IAssetsData from "models/AssetsModel"
import TAssetsReport from "models/AssetsReportModel"

import AssetsReport from "./AssetsReport/AssetsReport"


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
         backgroundColor: "rgb(245, 245, 245)",
         margin: [0, 0, 0, 0],
         spacingTop: 0,
         spacingBottom: 0,
         spacingLeft: 0,
         spacingRight: 0,
         selectionMarkerFill: "none",
      },
      title: {
         text: `Total: ${overview.totalAssets}`,
         y: window.screen.width >= 1366 ? 20 : 200,
         style: {
            fontWeight: 900,
         },
      },
      legend: {
         enabled: true,
      },
      plotOptions: {
         pie: {
            size: "70%",
            allowPointSelect: false,
            cursor: "pointer",
            showInLegend: window.screen.width >= 1366 ? false : true,
            dataLabels: {
               enabled: window.screen.width >= 1366 ? true : false,
               style: {
                  fontWeight: 500,
                  fontSize: 20 + "px",
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
      ],
   }

   return (
      <div className={classes["assetsOverview-container"]}>
         <h1>ATIVOS</h1>
         <div className={classes["assetsOverview-subContainer"]}>
         {/* <CircularProgressbar value={66} text={`66%`} />; */}
            <AssetsReport assetsReport={overview} />
            <HighchartsReact highcharts={Highcharts} options={options} />
         </div>
      </div>
   )
}

export default AssetsOverview
