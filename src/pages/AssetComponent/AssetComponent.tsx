import { useState, useEffect } from "react"

import classes from "./Asset.module.scss"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import moment from 'moment'

import { RouteComponentProps } from "react-router"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import IAssetsData from "models/AssetsModel"
import { IconName } from "@fortawesome/fontawesome-svg-core"

// import SelectAgent from "./SelectAgent/SelectAgent"
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

type StatusRate = {
   inOperation: number
   inAlert: number
   plannedStop: number
   inDowntime: number
   unplannedStop: number
}

const statusRate: StatusRate = {
   inOperation: 5,
   inAlert: 4,
   plannedStop: 3,
   inDowntime: 2,
   unplannedStop: 1
}

type StatusInfo = [string, string, IconName]

const setStatusArr = (color: string, status: string, icon: IconName): StatusInfo => {
   return [color, status, icon]
}

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
   const [statusInfo, setStatusInfo] = useState<StatusInfo>([] as unknown as StatusInfo)

   const [healthColor, setHealthColor] = useState<string>(colors[3])
   // const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

   // const openModal = (): void => {
   //    if (isModalOpen) {
   //       setIsModalOpen(false)
   //       document.body.style.overflow = "scroll"
   //    } else {
   //       setIsModalOpen(true)
   //       document.body.style.overflow = "hidden"
   //    }
   // }

   useEffect(() => {
      let currentStatus = setStatusArr(colors[0], "Funcionando", "check-circle")

      switch (currentAsset?.status) {
         case 'inAlert':
            currentStatus = setStatusArr(colors[1], "Em alerta", "exclamation-triangle")
            break
         case 'inDowntime':
            currentStatus = setStatusArr(colors[2], "Parada", "minus-square")
            break
         default:
            currentStatus = currentStatus
      }

      setStatusInfo(currentStatus)
   }, [currentAsset?.status, colors])

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
   }, [colors, currentAsset?.healthscore, JSON.stringify(statusInfo)])

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
         text: 'Histórico de Saúde do Ativo'
       },
       xAxis: {
         categories: currentAsset.healthHistory && currentAsset.healthHistory.map(date => moment(date.timestamp).utc().format('DD/MM/YY'))
       },
       yAxis: {
         title: {
           text: 'Status'
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
       series: [
         {
            name: currentAsset.name,
            data: currentAsset.healthHistory && currentAsset.healthHistory.map(item => statusRate[item.status as keyof StatusRate])
         }
      ]
   }


   return (
      <div className={classes["Asset-container"]}>
         {/* {isModalOpen && <SelectAgent modalHandler={openModal} asset={currentAsset?.name} />} */}
         <AssetImage currentAsset={currentAsset} />
         <AssetHealthMobile 
            currentAsset={currentAsset} 
            healthColor={healthColor}
            statusInfo={statusInfo}
         />
         <AssetHealth 
            currentAsset={currentAsset} 
            healthColor={healthColor}
            statusInfo={statusInfo}
         />
         <AssetContainer 
            currentAsset={currentAsset}
            colors={colors}
            // openModal={openModal}
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
