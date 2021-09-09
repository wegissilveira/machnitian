import React from 'react'

import classes from './UserList.module.css'

import AssetsService from 'services/assetsService'
import IUsersData from 'models/UsersModel'

import UserModal from 'components/UserModal/UserModal'


const UsersLIst: React.FC = () => {
    let [users, setUsers] = React.useState<Array<IUsersData>>([])
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
        AssetsService.getAllUsers()
            .then(response => setUsers(response.data))
    }, [])


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
                        users.map((user, index) => {
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
                    user={users[currentUser]} 
                    open={isModalOpen}
                    modalHandler={openModal}
                />
            }
        </div>
    )
}

export default UsersLIst