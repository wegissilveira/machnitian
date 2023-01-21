import classes from './AssetHealth.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IAssetsData, { Icon } from "models/AssetsModel"


type Props = {
   currentAsset: IAssetsData
   // healthColor: React.CSSProperties
   healthColor: any
   statusIcon: Icon
   statusInfo: string[]
}

const AssetHealth = (props: Props) => {
   const { 
      currentAsset, 
      healthColor, 
      statusIcon, 
      statusInfo 
   } = props


   return (
      <div className={classes["Asset-healthInfo--container"]}>
         <div
            style={{ color: healthColor }}
            className={classes["Health-notation"]}
         >
            <h2>Saúde da máquina</h2>
            <div className={classes["Health-notation--circle"]}>
               <p>{currentAsset?.healthscore}%</p>
            </div>
            <FontAwesomeIcon
               className={classes["Asset-HealthScore"]}
               icon={["fas", "file-medical-alt"]}
               size="3x"
            />
         </div>
         <div className={classes["Status-notation"]}>
            <h2>Status da máquina</h2>
            <div>
               <FontAwesomeIcon
                  icon={["fas", statusIcon]}
                  size="5x"
                  color={statusInfo[0]}
               />
               <h3>{statusInfo[1]}</h3>
            </div>
         </div>
      </div>
   )
}

export default AssetHealth
