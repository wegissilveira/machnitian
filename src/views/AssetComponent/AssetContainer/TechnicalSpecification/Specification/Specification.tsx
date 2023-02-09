import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IAssetsData, { SpecificationKeyDetailsType } from "models/AssetsModel"


type Props = {
   currentAsset: IAssetsData
   colors: string[]
   specificationDetails: SpecificationKeyDetailsType[]
}

const buildSpecificationValue = (currentAsset: IAssetsData, specification: SpecificationKeyDetailsType) => {
   if (Object.keys(currentAsset).length > 0) {
      if (currentAsset?.specifications[specification.key]) {
         return `${currentAsset?.specifications[specification.key]} ${specification.unit}`
      } else {
         return "N/A"
      }
   }
}

const Specification = (props: Props) => {
   const {
      currentAsset,
      colors,
      specificationDetails
   } = props

   return (
      <>
         {
            specificationDetails.map((specification) => {
               return (
                  <div key={specification.name}>
                     <FontAwesomeIcon icon={["fas", specification.icon]} color={'orange'} />
                     <p>
                        <span>{specification.name}:</span>{" "} 
                        { buildSpecificationValue(currentAsset, specification) }
                     </p>
                  </div>
               )
            })
         }
      </>
   )
}

export default Specification