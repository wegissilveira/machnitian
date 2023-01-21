import { useState, useEffect } from "react"

import classes from "./Asset.module.scss"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"

import { RouteComponentProps } from "react-router"

import IAssetsData, { Icon } from "models/AssetsModel"
import IUnitsData from "models/UnitsModel"

import SelectAgent from "./SelectAgent/SelectAgent"
import AssetImage from "./AssetContainer/AssetImage/AssetImage"
import AssetHealth from "./AssetContainer/AssetHealth/AssetHealth"
import AssetHealthMobile from "./AssetContainer/AssetHealthMobile/AssetHealthMobile"
import AssetContainer from "./AssetContainer/AssetContainer"


interface StateProps {
   assets: Array<IAssetsData>
   units: Array<IUnitsData>
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
      units,
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


   return (
      <div className={classes["asset-container"]}>
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
      </div>
   )
}

const mapStateToProps = (state: ApplicationState) => ({
   assets: state.assets.assets,
   units: state.assets.units,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
   bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssetComponent)
