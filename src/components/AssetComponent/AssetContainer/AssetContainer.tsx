import classes from './AssetContainer.module.scss'
import IAssetsData from "models/AssetsModel"

import TechnicalSpecification from './TechnicalSpecification/TechnicalSpecification'
import AssetDetails from './AssetDetails/AssetDetails'
import AssetUpTime from './AssetupTime/AssetupTime'


type Props = {
   currentAsset: IAssetsData
   colors: string[]
   openModal: () => void
}

const AssetContainer = (props: Props) => {
   const {
      currentAsset,
      colors,
      openModal
   } = props

   return (
      <div className={classes["AssetDetails-container"]}>
         <h2>{currentAsset?.name}</h2>
         <AssetUpTime 
            currentAsset={currentAsset}
            colors={colors}
         />
         <AssetDetails 
            currentAsset={currentAsset}
            colors={colors}
            openModal={openModal}
         />
         <TechnicalSpecification 
            currentAsset={currentAsset}
            colors={colors}
         />
      </div>
   )
}

export default AssetContainer