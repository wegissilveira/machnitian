import classes from './GeneralInfo.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import { ApplicationState } from "store"

import IAssetsData from 'models/AssetsModel'
import IUnitsData from 'models/UnitsModel'
import IUsersData from 'models/UsersModel'


type StateProps = {
   assets: Array<IAssetsData>
   units: Array<IUnitsData>
   users: Array<IUsersData>
}

const GeneralInfo = (props: StateProps) => {
   const {
      assets,
      units,
      users   
   } = props


   return (
      <div className={classes['GeneralInfo-wrapper']}>
         <h2 className={classes['GeneralInfo-header']}>Informações Gerais</h2>
         <div className={classes['GeneralInfo-container']}>
            <div className={classes['GeneralInfo-subContainer']}>
               <FontAwesomeIcon icon={["fas", "gears"]} color={'orange'} size={'3x'} />
               <p className={classes['GeneralInfo-data']}>{assets.length}</p>
               <p className={classes['GeneralInfo-item']}>Ativos</p>
            </div>
            <div className={classes['GeneralInfo-subContainer']}>
               <FontAwesomeIcon icon={["fas", "server"]} color={'green'} size={'3x'} />
               <p className={classes['GeneralInfo-data']}>{units.length}</p>
               <p className={classes['GeneralInfo-item']}>Unidades</p>
            </div>
            <div className={classes['GeneralInfo-subContainer']}>
               <FontAwesomeIcon icon={["fas", "user-gear"]} color={"#176aff"} size={'3x'} />
               <p className={classes['GeneralInfo-data']}>{users.length}</p>
               <p className={classes['GeneralInfo-item']}>Usuários</p>
            </div>
         </div>
      </div>
   )
}

const mapStateToProps = (state: ApplicationState) => ({
   assets: state.assets.assets,
   users: state.assets.users,
   units: state.assets.units
})

export default connect(mapStateToProps)(GeneralInfo)