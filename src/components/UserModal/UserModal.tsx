import React from 'react'

import classes from './UserModal.module.css'

import * as AssetsActions from 'store/ducks/assets/actions'
import { ApplicationState } from 'store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import IUsersData from 'models/UsersModel'
import IUnitsData from 'models/UnitsModel'


interface StateProps {
    units: Array<IUnitsData>
}

interface DispatchProps {
    loadRequest(): void
}

interface OwnProps {
    user: IUsersData,
    open: boolean,
    modalHandler: (userIndex: number) => void
}

type Props = StateProps & DispatchProps & OwnProps


const UserModal: React.FC<Props> = props => {

    let [updatedUser, setUpdatedUser] = React.useState<IUsersData>()
    
    const closeModal = (): void => {
        props.modalHandler(-1)
    }

    let style = {
        display: props.open ? 'block' : 'none',
    }

    React.useEffect(() => {
        props.units.forEach(unit => {
            unit.id === props.user.companyId && setUpdatedUser({
                ...props.user,
                companyName: unit.name
            })
        })
    }, [props.units, props.user])


    return (
        <div 
            style={style}
            className={classes['UserModal-wrapper']}
        >
            <div 
                className={classes['UserModal-container']}
            >
                <FontAwesomeIcon 
                    icon={['fas', 'sign-out-alt']} size="2x" color="red"
                    onClick={closeModal}
                />
                <div className={classes['UserModal-subContainer']}>
                    <div className={classes['UserModal-subContainer--header']}>
                        <h1>{props.user.name}</h1>
                        <FontAwesomeIcon icon={['fas', 'edit']} color="#1e3c8f" />
                    </div>
                    <FontAwesomeIcon icon={['fas', 'user-circle']} size="4x"/>
                    <div className={classes['UserModal-details']}>
                        <p><span>Id: </span>{updatedUser?.id}</p>
                        <p><span>E-mail: </span>{updatedUser?.email}</p>
                        <p><span>Unidade: </span>{updatedUser?.companyName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state: ApplicationState) => ({
    units: state.assets.units
})

const mapDispatchToProps = (dispatch: Dispatch) => 
    bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserModal)