import { useEffect, useState } from "react"

import classes from "./UserModal.module.scss"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import IUsersData from "models/UsersModel"
import IUnitsData from "models/UnitsModel"

interface StateProps {
   units: Array<IUnitsData>
}


interface OwnProps {
   user: IUsersData
   open: boolean
   modalHandler: (userIndex: number) => void
}

type Props = StateProps & OwnProps

const UserModal = (props: Props) => {
   const {
      user,
      open,
      modalHandler,
      units
   } = props

   const [updatedUser, setUpdatedUser] = useState<IUsersData>()

   const closeModal = (): void => {
      modalHandler(-1)
   }

   const style = {
      display: open ? "block" : "none",
   }  

   useEffect(() => {
      units.forEach((unit) => {
         unit.id === user.companyId &&
            setUpdatedUser({
               ...user,
               companyName: unit.name,
            })
      })
   }, [units, user])

   return (
      <div style={style} className={classes["UserModal-wrapper"]}>
         <div className={classes["UserModal-container"]}>
            <FontAwesomeIcon
               icon={["fas", "sign-out-alt"]}
               size="2x"
               color="red"
               onClick={closeModal}
            />
            <div className={classes["UserModal-subContainer"]}>
               <div className={classes["UserModal-subContainer--header"]}>
                  <h1>{user.name}</h1>
                  <FontAwesomeIcon icon={["fas", "edit"]} color="#1e3c8f" />
               </div>
               <FontAwesomeIcon icon={["fas", "user-circle"]} size="4x" />
               <div className={classes["UserModal-details"]}>
                  <p>
                     <span>Id: </span>
                     {updatedUser?.id}
                  </p>
                  <p>
                     <span>E-mail: </span>
                     {updatedUser?.email}
                  </p>
                  <p>
                     <span>Unidade: </span>
                     {updatedUser?.companyName}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

const mapStateToProps = (state: ApplicationState) => ({
   units: state.assets.units,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
   bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserModal)
