import {useState, useEffect} from "react"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"

import IUnitsData from "models/UnitsModel"
import { ItemsListType } from "components/shared/ItemsList/ItemsList"
import ItemsList from "components/shared/ItemsList/ItemsList"

interface StateProps {
   units: Array<IUnitsData>
}

interface DispatchProps {
   loadRequest(): void
}

type Props = StateProps & DispatchProps

type UnitsValuesType = {
   id: number
   name: string
}

const UnitsList = (props: Props) => {
   const { units, loadRequest } = props

   const [unitsTableValue, setUnitsTableValue] = useState<UnitsValuesType[]>([])
   const [ItemsListDetails, setItemsListDetails] = useState({} as ItemsListType<UnitsValuesType>)

   useEffect(() => {
      const assetsTableValue = units.map((unit) => {
         return {
            id: unit.id,
            name: unit.name,
         }
      })

      setUnitsTableValue(assetsTableValue)
   }, [units])

   useEffect(() => {
      const ItemsListDetails = {
         title: 'LISTA DE Unidades',
         header: ["Id", "Nome"],
         values: unitsTableValue,
      }

      setItemsListDetails(ItemsListDetails)
   }, [unitsTableValue])

   useEffect(() => {
      loadRequest()
   }, [props])

   return (
      <ItemsList itemsListDetails={ItemsListDetails} />
   )
}

const mapStateToProps = (state: ApplicationState) => ({
   units: state.assets.units,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
   bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UnitsList)
