import classes from './AssetDetails.module.scss'

import IAssetsData, { DetailsKeyType } from "models/AssetsModel"
import Details from "./Details/Details"

type Props = {
   currentAsset: IAssetsData
   colors: string[]
   openModal: () => void
}

const details: DetailsKeyType[] = [
   {icon: 'cog', name: 'Modelo', key: 'model'},
   {icon: 'building', name: 'Unidade', key: 'unitId'},
   {icon: 'charging-station', name: 'Sensores', key: 'sensors'},
   {icon: 'user-cog', name: 'Responsável', key: 'agent'},
]

const AssetDetails = (props: Props) => {
   const { 
      currentAsset, 
      colors,
      openModal
   } = props
  
   return (
      <div className={classes['Asset-details-wrapper']}>
         <h3>Detalhes</h3>
         <Details 
            currentAsset={currentAsset}
            colors={colors}
            details={details}
            openModal={openModal}
         />
      </div>
   )
}

export default AssetDetails
