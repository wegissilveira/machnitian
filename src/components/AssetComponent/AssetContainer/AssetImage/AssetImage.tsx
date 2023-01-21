import classes from './AssetImage.module.scss'

import IAssetsData from "models/AssetsModel"

type Props = {
   currentAsset: IAssetsData
}

const AssetImage = (props: Props) => {
   const { currentAsset } = props

   return (
      <div className={classes["assetImg-container"]}>
         <img src={currentAsset?.image} alt={currentAsset?.name} />
      </div>
   )
}

export default AssetImage
