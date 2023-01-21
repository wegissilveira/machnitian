import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IAssetsData, { DetailsKeyType } from "models/AssetsModel"


type Props = {
   currentAsset: IAssetsData
   colors: string[]
   details: DetailsKeyType[]
   openModal: () => void
}

const capitalize = (str: string) => {      
   if (str) {
      let splitStr = str.toString().toLowerCase().split(" ")
      if (splitStr) {
         for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] =
               splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
         }   
         return splitStr.join(" ")
      }
   }
}


const Details = (props: Props) => {
   const {
      currentAsset,
      colors,
      details,
      openModal
   } = props

   const buildDetailValue = (currentAsset: IAssetsData, detail: DetailsKeyType) => {
      if (currentAsset?.[detail.key]) {
         if (detail.key === 'sensors') {
            return currentAsset?.sensors.join(", ")
         } else {
            return capitalize(currentAsset?.[detail.key] as string)
         }         
      } else {
         if (detail.key === 'agent') {
            return <button onClick={openModal}>Selecione</button>
         }
      }
   }
   
   return (
      <>
         {
            details.map((detail) => {
               return (
                  <div key={detail.name}>
                     <FontAwesomeIcon icon={["fas", detail.icon]} color={colors[0]} />
                     <p>
                        <span>{detail.name}: </span> 
                        { buildDetailValue(currentAsset, detail) }
                     </p>
                  </div>
               )
            })            
         }
      </>
   )
}

export default Details