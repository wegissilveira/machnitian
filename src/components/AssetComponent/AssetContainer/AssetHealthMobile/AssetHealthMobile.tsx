import classes from './AssetHealthMobile.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IAssetsData, { Icon } from "models/AssetsModel"


type Props = {
   currentAsset: IAssetsData
   // healthColor: React.CSSProperties
   healthColor: any
   statusIcon: Icon
   statusInfo: string[]
}

const AssetHealthMobile = (props: Props) => {
   const { 
      currentAsset, 
      healthColor, 
      statusIcon, 
      statusInfo 
   } = props


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
               icon={["fas", statusIcon]}
               size="3x"
               color={statusInfo[0]}
            />
         </div>
      </div>
   )
}

export default AssetHealthMobile
