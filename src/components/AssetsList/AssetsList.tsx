import { useEffect, useState } from "react"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import IAssetsData, { Icon } from "models/AssetsModel"
import ItemsList from "components/shared/ItemsList/ItemsList"
import { ItemsListType } from "components/shared/ItemsList/ItemsList"

interface StateProps {
   assets: Array<IAssetsData>
}

interface DispatchProps {
   loadRequest(): void
}

type Props = StateProps & DispatchProps

type ItemsValuesType = {
   link: boolean
   id: number
   name: string
   status: JSX.Element
   healthscore: number
}

const AssetsList = (props: Props) => {
   const { assets, loadRequest } = props

   const [assetsTableValue, setAssetsTableValue] = useState<ItemsValuesType[]>([])
   const [ItemsListDetails, setItemsListDetails] = useState<ItemsListType<ItemsValuesType>>({} as ItemsListType<ItemsValuesType>)

   useEffect(() => {    
      const assetsTableValue = assets.map((asset) => {
         let icon: Icon
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

      setAssetsTableValue(assetsTableValue)
   }, [assets])

   useEffect(() => {
      const ItemsListDetails = {
         title: 'Lista de Ativos',
         header: ["Id", "Nome", "Status", "Saúde"],
         values: assetsTableValue,
      }

      setItemsListDetails(ItemsListDetails)
   }, [assetsTableValue])

   useEffect(() => {
      loadRequest()
   }, [props])

   return (
      <ItemsList itemsListDetails={ItemsListDetails} />
   )
}

const mapStateToProps = (state: ApplicationState) => ({
   assets: state.assets.assets,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
   bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssetsList)
