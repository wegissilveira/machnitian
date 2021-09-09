import React from 'react'

import classes from './UserModal.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import IUsersData from 'models/UsersModel'


const UserModal: React.FC<{
    user: IUsersData, 
    open: boolean,
    modalHandler: (userIndex: number) => void
}> = props => {
    

    const closeModal = (): void => {
        props.modalHandler(-1)
    }

    let style = {
        display: props.open ? 'block' : 'none',
    }


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
                        <p><span>Id: </span>{props.user.id}</p>
                        <p><span>E-mail: </span>{props.user.email}</p>
                        <p><span>Unidade: </span>{props.user.unitId}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserModal