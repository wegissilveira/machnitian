import classes from './AssetHealth.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconName } from "@fortawesome/fontawesome-svg-core"
import IAssetsData from "models/AssetsModel"


type Props = {
   currentAsset: IAssetsData
   healthColor: string
   statusInfo: [string, string, IconName]
}

const AssetHealth = (props: Props) => {
   const { 
      currentAsset, 
      healthColor, 
      statusInfo 
   } = props

   if (statusInfo.length < 1) return <></>
   
   return (
      <div className={classes["Asset-healthInfo--container"]}>
         <div
            style={{ color: healthColor }}
            className={classes["Health-notation"]}
         >
            <h2>Saúde da máquina</h2>
            <div className={classes["Health-notation--circle"]}>
               {currentAsset?.healthscore}%
               <FontAwesomeIcon
                  icon={["fas", "file-medical-alt"]}
                  size="3x"
               />
            </div>
         </div>
         <div className={classes["Status-notation"]}>
            <h2>Status da máquina</h2>
            <div>
               <FontAwesomeIcon
                  icon={["fas", statusInfo[2]]}
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
