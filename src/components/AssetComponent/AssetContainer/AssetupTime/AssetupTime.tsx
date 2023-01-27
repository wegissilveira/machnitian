import classes from './AssetupTime.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IAssetsData from "models/AssetsModel"

type Props = {
   currentAsset: IAssetsData
   colors: string[]
}

const AssetUpTime = (props: Props) => {
   const { 
      currentAsset,
      colors
   } = props

   return (
      <div className={classes["Asset-uptime"]}>
         <FontAwesomeIcon icon={["far", "clock"]} color={'orange'} />
         <p>
            <span>Tempo ligado:</span>{" "}
            {Object.keys(currentAsset).length > 0 && currentAsset?.metrics.totalUptime?.toFixed()} horas
         </p>
      </div>
   )
}

export default AssetUpTime