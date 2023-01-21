import IAssetsData, { SpecificationKeyDetailsType } from "models/AssetsModel"
import Specification from "./Specification/Specification"


type Props = {
   currentAsset: IAssetsData
   colors: string[]
}

const specificationDetails: SpecificationKeyDetailsType[] = [
   {icon: 'car-battery', name: 'Power', unit: 'kW', key: 'power'},
   {icon: 'temperature-high', name: 'Temperatura Máxima', unit: '°C', key: 'maxTemp'},
   {icon: 'sync-alt', name: 'RPM', unit: '', key: 'rpm'}
]

const TechnicalSpecification = (props: Props) => {
   const { 
      currentAsset, 
      colors 
   } = props


   return (
      <div>
         <h3>Especificações Técnicas</h3>
         <Specification 
            currentAsset={currentAsset}
            colors={colors}
            specificationDetails={specificationDetails}
         />
      </div>
   )
}

export default TechnicalSpecification
