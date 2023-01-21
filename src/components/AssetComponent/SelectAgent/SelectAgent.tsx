import React from 'react'

import classes from './SelectAgent.module.css'

import * as AssetsActions from 'store/ducks/assets/actions'
import { ApplicationState } from 'store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import IUsersData from 'models/UsersModel'


interface StateProps {
    users: Array<IUsersData>
}

interface DispatchProps {
    loadRequest(): void
}

interface OwnProps {
    modalHandler: () => void,
    asset: string | undefined,
}

type Props = StateProps & DispatchProps & OwnProps 


const SelectAgent: React.FC<Props> = props => {

    const inputContainerRef = React.useRef<HTMLInputElement | null>(null)

    const closeModal = (): void => {
        props.modalHandler()
    }

    const changeAgent = (index: number) => {
        const confirmAgent = window.confirm(`Delegar '${props.users[index].name}' como responsável do ativo '${props.asset}'`)

        if (confirmAgent) {
            alert('Solicitação de alteração enviada com sucesso!')
            setTimeout(() => {
                closeModal()
            }, 500)
        }
    }


    return (
        <div className={classes['SelectAgent-container']}>
            <div className={classes['SelectAgent-subContainer']}>
                <FontAwesomeIcon 
                    icon={['fas', 'sign-out-alt']} size="2x" color="red"
                    onClick={closeModal}
                />
                <h3>Selecione um responsável</h3>
                <div ref={inputContainerRef} className={classes['SelectAgent-inputs--container']}>
                    {
                        props.users.map((user, index) => {
                            return (
                                <div key={user+'-'+index} onClick={() => changeAgent(index)}>
                                    <label>{user.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
            
        </div>
    )
}


const mapStateToProps = (state: ApplicationState) => ({
    users: state.assets.users
})

const mapDispatchToProps = (dispatch: Dispatch) => 
    bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SelectAgent)