import { useEffect, useState } from "react"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import useBuildTableValues from "./useBuildTableValues"

import IAssetsData from "models/AssetsModel"
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

   const buildTableValues = useBuildTableValues()

   useEffect(() => {    
      const assetsTableValue = buildTableValues(assets)
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
   }, [])

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
