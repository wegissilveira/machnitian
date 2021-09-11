import React from 'react'

import classes from './AssetsList.module.css'

import * as AssetsActions from 'store/ducks/assets/actions'
import { ApplicationState } from 'store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import IAssetsData from 'models/AssetsModel'


interface StateProps {
    assets: Array<IAssetsData>,
}

interface DispatchProps {
    loadRequest(): void
}

type Props = StateProps & DispatchProps


const AssetsList: React.FC<Props> = props => {

    React.useEffect(() => {
        props.loadRequest()
    }, [props])


    return (
        <div className={classes['AssetsList-container']}>
            <h1>ASSETS LIST</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Status</th>
                        <th scope="col">Saúde</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.assets.map((asset, index) => {
                        return <tr key={`${asset.name}-${index}`}>
                                <td data-label="Id"><Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >{asset.id}</Link></td>
                                <td data-label="Nome"><Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >{asset.name}</Link></td>
                                <td data-label="Status">
                                    <Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >
                                        {asset.status === 'inOperation' && 
                                            <FontAwesomeIcon 
                                                icon={['fas', 'check-circle']} 
                                                size="2x"
                                                color="#2563eb" 
                                            />
                                        }
                                        {asset.status === 'inAlert' && 
                                            <FontAwesomeIcon 
                                                icon={['fas', 'exclamation-triangle']} 
                                                size="2x"
                                                color="#ffad00" 
                                            />
                                        }
                                        {asset.status === 'inDowntime' && 
                                            <FontAwesomeIcon 
                                                icon={['fas', 'minus-square']} 
                                                size="2x"
                                                color="#ff2e3b" 
                                            />
                                        }
                                    </Link>
                                </td>
                                <td data-label="Saúde"><Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >{asset.healthscore}</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}


const mapStateToProps = (state: ApplicationState) => ({
    assets: state.assets.assets
})

const mapDispatchToProps = (dispatch: Dispatch) => 
    bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssetsList)