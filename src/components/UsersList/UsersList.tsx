import React from 'react'

import classes from './UserList.module.css'

import * as AssetsActions from 'store/ducks/assets/actions'
import { ApplicationState } from 'store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import IUsersData from 'models/UsersModel'

import UserModal from 'components/UserModal/UserModal'


interface StateProps {
    users: Array<IUsersData>,
}

interface DispatchProps {
    loadRequest(): void
}

type Props = StateProps & DispatchProps


const UsersLIst: React.FC<Props> = props => {
    let [currentUser, setCurrentUser] = React.useState<number>(-1)
    let [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)


    const openModal = (userIndex: number):void => {
        setCurrentUser(userIndex)
        if (isModalOpen) {
            setIsModalOpen(false)
            document.body.style.overflow = 'scroll'
        } else {
            setIsModalOpen(true)
            document.body.style.overflow = 'hidden' 
        }
    }

    React.useEffect(() => {
        props.loadRequest()
    }, [props])


    return (
        <div className={classes['UserList-container']}>
            <h1>LISTA DE ATIVOS</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Unidade</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users.map((user, index) => {
                            return (
                                <tr 
                                    key={`${user.name}-${index}`}
                                    onClick={() => openModal(index)}
                                >
                                    <td data-label="Id">{user.id}</td>
                                    <td data-label="Nome">{user.name}</td>
                                    <td data-label="Unidade">{user.unitId}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {isModalOpen &&
                <UserModal 
                    user={props.users[currentUser]} 
                    open={isModalOpen}
                    modalHandler={openModal}
                />
            }
        </div>
    )
}


const mapStateToProps = (state: ApplicationState) => ({
    users: state.assets.users
})

const mapDispatchToProps = (dispatch: Dispatch) => 
    bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UsersLIst)