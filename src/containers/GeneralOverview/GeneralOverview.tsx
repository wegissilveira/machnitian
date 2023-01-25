import { Component } from "react"

import classes from "./GeneralOverview.module.scss"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"

import IAssetsData from "models/AssetsModel"
import IUsersData from "models/UsersModel"
import IUnitsData from "models/UnitsModel"
import ICompanyData from "models/CompanyModel"

import AssetsOverview from "components/AssetsOverview/AssetsOverview"
import Overview from "components/Overview/Overview"
import GeneralInfo from "components/GeneralInfo/GeneralInfo"

interface StateProps {
   assets: Array<IAssetsData>
   users: Array<IUsersData>
   units: Array<IUnitsData>
   company: Array<ICompanyData>
}

interface DispatchProps {
   loadRequest(): void
}

type Props = StateProps & DispatchProps

class GeneralOverview extends Component<Props> {
   componentDidMount() {
      const { loadRequest } = this.props
      loadRequest()
   }

   render() {
      const { assets, users, units, company } = this.props

      return (
         <div className={classes['Overview-wrapper']}>
            <AssetsOverview assets={assets} />
            {/* <h1 className={classes["Overview-title"]}>EMPRESA</h1> */}
            {/* <div className={classes['Overview-sidebar--wrapper']}>
               <Overview title={"Empresa"} values={company} />
               <Overview title={"Ativos"} link={"assets-list"} values={assets} />
               <Overview title={"Unidades"} link={"units-list"} values={units} />
               <Overview title={"Usuários"} link={"users-list"} values={users} />
            </div> */}
            <GeneralInfo />
         </div>
      )
   }
}

const mapStateToProps = (state: ApplicationState) => ({
   assets: state.assets.assets,
   users: state.assets.users,
   units: state.assets.units,
   company: state.assets.company,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
   bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GeneralOverview)
