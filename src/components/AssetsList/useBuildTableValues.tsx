import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconName } from "@fortawesome/fontawesome-svg-core"
import IAssetsData from "models/AssetsModel"

const useBuildTableValues = () => {
   const buildTableValues = (assets: IAssetsData[]) => {
      const assetsTableValue = assets.map((asset) => {
         let icon: IconName
         let iconColor: string
         switch(asset.status) {
            case 'inOperation':
               icon = 'check-circle'
               iconColor = '#2563eb'
               break
            case 'inDowntime':
               icon = 'minus-square'
               iconColor = '#ff2e3b'
               break
            default:
               icon = 'exclamation-triangle'
               iconColor = '#ffad00'
         }
   
         const iconEl = <FontAwesomeIcon
                  icon={['fas', icon]}
                  size="2x"
                  color={iconColor}
               />
   
         return {
            link: true,
            id: asset.id,
            name: asset.name,
            status: iconEl,
            healthscore: asset.healthscore,
         }
      }) 

      return assetsTableValue
   }

   return buildTableValues
}

export default useBuildTableValues