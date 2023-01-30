import { useState, useEffect } from "react"

import classes from "./Asset.module.scss"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"

import { RouteComponentProps } from "react-router"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import IAssetsData, { Icon } from "models/AssetsModel"

import SelectAgent from "./SelectAgent/SelectAgent"
import AssetImage from "./AssetContainer/AssetImage/AssetImage"
import AssetHealth from "./AssetContainer/AssetHealth/AssetHealth"
import AssetHealthMobile from "./AssetContainer/AssetHealthMobile/AssetHealthMobile"
import AssetContainer from "./AssetContainer/AssetContainer"



interface StateProps {
   assets: Array<IAssetsData>
}

interface DispatchProps {
   loadRequest(): void
}

type TParams = { id: string }

interface MyComponent extends RouteComponentProps<TParams> {}

type Props = StateProps & DispatchProps & MyComponent

const AssetComponent = (props: Props) => {
   const {
      assets,
      loadRequest,
      match
   } = props

   const [currentAsset, setCurrentAsset] = useState<IAssetsData>({} as IAssetsData)
   const [colors] = useState<string[]>([
      "#2563eb",
      "#ffad00",
      "#ff2e3b",
      "green",
      "rgb(255, 94, 0)",
   ])
   const [statusIcon, setStatusIcon] = useState<Icon>("check-circle")
   const [statusInfo, setStatusInfo] = useState<string[]>([
      colors[0],
      "Funcionando",
   ])
   const [healthColor, setHealthColor] = useState<string>(colors[3])
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

   const openModal = (): void => {
      if (isModalOpen) {
         setIsModalOpen(false)
         document.body.style.overflow = "scroll"
      } else {
         setIsModalOpen(true)
         document.body.style.overflow = "hidden"
      }
   }

   useEffect(() => {
      let currentStatus = []
      let currentStatusIcon = statusIcon

      if (currentAsset?.status === "inOperation") {
         currentStatusIcon = "check-circle"
         currentStatus[0] = colors[0]
         currentStatus[1] = "Funcionando"
      } else if (currentAsset?.status === "inAlert") {
         currentStatusIcon = "exclamation-triangle"
         currentStatus[0] = colors[1]
         currentStatus[1] = "Em alerta"
      } else if (currentAsset?.status === "inDowntime") {
         currentStatusIcon = "minus-square"
         currentStatus[0] = colors[2]
         currentStatus[1] = "Parada"
      }

      setStatusIcon(currentStatusIcon)
      setStatusInfo(currentStatus)
   }, [currentAsset?.status, colors, statusIcon])

   useEffect(() => {
      if (currentAsset?.healthscore) {
         if (currentAsset?.healthscore >= 80) {
            setHealthColor(colors[3])
         } else if (currentAsset?.healthscore >= 70) {
            setHealthColor(colors[4])
         } else {
            setHealthColor(colors[2])
         }
      }
   }, [colors, currentAsset?.healthscore])

   useEffect(() => {
      loadRequest()
   }, [props])

   useEffect(() => {
      assets.forEach((asset) => {
         asset.id === Number(match.params.id) && setCurrentAsset(asset)
      })
   }, [assets, match.params.id])

   const options = {
      chart: {
         type: 'line'
       },
       title: {
         text: 'Monthly Average Temperature'
       },
       subtitle: {
         text: 'Source: ' +
           '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
           'target="_blank">Wikipedia.com</a>'
       },
       xAxis: {
         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
       },
       yAxis: {
         title: {
           text: 'Temperature (°C)'
         }
       },
       plotOptions: {
         line: {
           dataLabels: {
             enabled: true
           },
           enableMouseTracking: false
         }
       },
       series: [{
         name: 'Reggane',
         data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
           22.0, 17.8]
       }
      //  , {
      //    name: 'Tallinn',
      //    data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
      //      2.0, -0.9]
      //  }
      ]
   }


   return (
      <div className={classes["Asset-container"]}>
         {isModalOpen && <SelectAgent modalHandler={openModal} asset={currentAsset?.name} />}
         <AssetImage currentAsset={currentAsset} />
         <AssetHealthMobile 
            currentAsset={currentAsset} 
            healthColor={healthColor}
            statusIcon={statusIcon}
            statusInfo={statusInfo}
         />
         <AssetHealth 
            currentAsset={currentAsset} 
            healthColor={healthColor}
            statusIcon={statusIcon}
            statusInfo={statusInfo}
         />
         <AssetContainer 
            currentAsset={currentAsset}
            colors={colors}
            openModal={openModal}
         />
         <div className={classes["Asset-health--chart"]}>
            <HighchartsReact highcharts={Highcharts} options={options} />
         </div>
      </div>
   )
}

const mapStateToProps = (state: ApplicationState) => ({
   assets: state.assets.assets
})

const mapDispatchToProps = (dispatch: Dispatch) =>
   bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssetComponent)
