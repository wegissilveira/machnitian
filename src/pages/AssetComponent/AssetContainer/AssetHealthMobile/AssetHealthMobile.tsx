import classes from './AssetHealthMobile.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from "@fortawesome/fontawesome-svg-core"
import IAssetsData from "models/AssetsModel"


type Props = {
   currentAsset: IAssetsData
   healthColor: string
   statusInfo: [string, string, IconName]
}

const AssetHealthMobile = (props: Props) => {
   const { 
      currentAsset, 
      healthColor,
      statusInfo 
   } = props

   if (statusInfo.length < 1) return <></>
   
   return (
      <div className={classes["Asset-mainIcons"]}>
         <div
            style={{ color: healthColor }}
            className={classes["Health-notation"]}
         >
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
            <FontAwesomeIcon
               icon={["fas", statusInfo[2]]}
               size="3x"
               color={statusInfo[0]}
            />
         </div>
      </div>
   )
}

export default AssetHealthMobile
