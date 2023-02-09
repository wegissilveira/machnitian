import { Component } from "react"

import classes from "./GeneralOverview.module.scss"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"

import IAssetsData from "models/AssetsModel"
import IUsersData from "models/UsersModel"
import IUnitsData from "models/UnitsModel"

import AssetsOverview from "components/AssetsOverview/AssetsOverview"
import Overview from "components/Overview/Overview"
import GeneralInfo from "components/GeneralInfo/GeneralInfo"

interface StateProps {
   assets: Array<IAssetsData>
   users: Array<IUsersData>
   units: Array<IUnitsData>
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
      const { assets, users, units } = this.props
     
      
      return (
         <div className={classes['Overview-wrapper']}>
            <AssetsOverview assets={assets} />
            <div className={classes['Overview-subContainer']}>
               <Overview 
                  title={"Ativos"} 
                  link={"assets-list"} 
                  values={assets} 
                  icon={'gears'}
                  color={'orange'}
               />
               <Overview 
                  title={"Unidades"} 
                  link={"units-list"} 
                  values={units} 
                  icon={'server'}
                  color={'green'}
               />
               <Overview 
                  title={"Usuários"} 
                  link={"users-list"} 
                  values={users} 
                  icon={'user-gear'}
                  color={'#176aff'}
               />
            </div>
            <GeneralInfo />
         </div>
      )
   }
}

const mapStateToProps = (state: ApplicationState) => ({
   assets: state.assets.assets,
   users: state.assets.users,
   units: state.assets.units
})

const mapDispatchToProps = (dispatch: Dispatch) =>
   bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GeneralOverview)
