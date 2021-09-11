import React from 'react'

import classes from './UnitsList.module.css'

import * as AssetsActions from 'store/ducks/assets/actions'
import { ApplicationState } from 'store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import IUnitsData from 'models/UnitsModel'


interface StateProps {
    units: Array<IUnitsData>,
}

interface DispatchProps {
    loadRequest(): void
}

type Props = StateProps & DispatchProps


const UnitsList: React.FC<Props> = props => {

    React.useEffect(() => {
        props.loadRequest()
    }, [props])


    return (
        <div className={classes['UnitsList-container']}>
            <h1>LISTA DE USUÁRIOS</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.units.map((unit, index) => {
                            return (
                                <tr key={`${unit.name}-${index}`}
                                >
                                    <td data-label="Id">{unit.id}</td>
                                    <td data-label="Nome">{unit.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}


const mapStateToProps = (state: ApplicationState) => ({
    units: state.assets.units
})

const mapDispatchToProps = (dispatch: Dispatch) => 
    bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UnitsList)