import {useState, useEffect} from "react"

import * as AssetsActions from "store/ducks/assets/actions"
import { ApplicationState } from "store"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import IUsersData from "models/UsersModel"
import ItemsList, { ItemsListType } from "components/shared/ItemsList/ItemsList"
import UserModal from "components/UsersList/UserModal/UserModal"

interface StateProps {
   users: Array<IUsersData>
}

interface DispatchProps {
   loadRequest(): void
}

type Props = StateProps & DispatchProps

type UsersValuesType = {
   id: number
   name: string
   unitId: number
   editUser: JSX.Element
}

const UsersLIst = (props: Props) => {
   const { users, loadRequest } = props

   const [usersTableValue, setUsersTableValue] = useState<UsersValuesType[]>([])
   const [ItemsListDetails, setItemsListDetails] = useState({} as ItemsListType<UsersValuesType>)
   const [currentUser, setCurrentUser] = useState<number>(-1)
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

   const openModal = (userIndex: number): void => {      
      if (isModalOpen) {
         setIsModalOpen(false)
         document.body.style.overflow = "scroll"
      } else {
         setIsModalOpen(true)
         document.body.style.overflow = "hidden"
      }
      setCurrentUser(userIndex - 1)      
   }

   useEffect(() => {
      const usersTableValue = users.map((user) => {
         return {
            id: user.id,
            name: user.name,
            unitId: user.unitId,
            editUser: <FontAwesomeIcon onClick={() => openModal(user.id)} icon={['fas', 'edit']} color="#1e3c8f" />
         }
      })     
      setUsersTableValue(usersTableValue)
   }, [users])

   useEffect(() => {
      const ItemsListDetails = {
         title: "LISTA DE USUÁRIOS",
         header: ["Id", "Nome", "Unidade", "Editar"],
         values: usersTableValue,
      }

      setItemsListDetails(ItemsListDetails)
   }, [usersTableValue])

   useEffect(() => {
      loadRequest()
   }, [props])

   return (
      <>
         <ItemsList itemsListDetails={ItemsListDetails} />
         {isModalOpen && (
            <UserModal
               user={users[currentUser]}
               open={isModalOpen}
               modalHandler={openModal}
            />
         )}
      </>
   )
}

const mapStateToProps = (state: ApplicationState) => ({
   users: state.assets.users,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
   bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UsersLIst)
