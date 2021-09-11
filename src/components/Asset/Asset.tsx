import React from 'react'

import classes from './Asset.module.css'

import * as AssetsActions from 'store/ducks/assets/actions'
import { ApplicationState } from 'store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'

import IAssetsData from 'models/AssetsModel'
import IUnitsData from 'models/UnitsModel'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-common-types'

import SelectAgent from './SelectAgent/SelectAgent'


interface StateProps {
    assets: Array<IAssetsData>,
    units: Array<IUnitsData>,
}

interface DispatchProps {
    loadRequest(): void
}

type TParams = {id: string}

interface MyComponent extends RouteComponentProps<TParams> {}

type Props = StateProps & DispatchProps & MyComponent


const AssetComponent: React.FC<Props> = props => {

    let [currentAsset, setCurrentAsset] = React.useState<IAssetsData>()
    let [currentUnit, setCurrentUnit] = React.useState<IUnitsData>()
    let [colors, ] = React.useState<string[]>(['#2563eb', '#ffad00', '#ff2e3b', 'green', 'rgb(255, 94, 0)'])
    let [statusIcon, setStatusIcon] = React.useState<IconName>('check-circle')
    let [statusInfo, setStatusInfo] = React.useState<string[]>([colors[0], 'Funcionando'])
    let [healthColor, setHealthColor] = React.useState<string>(colors[3])
    let [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)


    const openModal = ():void => {
        if (isModalOpen) {
            setIsModalOpen(false)
            document.body.style.overflow = 'scroll'
        } else {
            setIsModalOpen(true)
            document.body.style.overflow = 'hidden' 
        }
    }

    const capitalize = (str: string | undefined) => {
        let splitStr = str?.toLowerCase().split(' ');
        if (splitStr) {
            for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
            
            return splitStr.join(' '); 
        }
    }

    React.useEffect(() => {
        let currentStatus = []
        let currentStatusIcon = statusIcon

        if (currentAsset?.status === 'inOperation') {
            currentStatusIcon = 'check-circle'
            currentStatus[0] = colors[0]
            currentStatus[1] = 'Funcionando'

        } else if (currentAsset?.status === 'inAlert') {
            currentStatusIcon = 'exclamation-triangle'
            currentStatus[0] = colors[1]
            currentStatus[1] = 'Em alerta'

        } else if (currentAsset?.status === 'inDowntime') {
            currentStatusIcon = 'minus-square'
            currentStatus[0] = colors[2]
            currentStatus[1] = 'Parada'
        }

        setStatusIcon(currentStatusIcon)
        setStatusInfo(currentStatus)

    }, [currentAsset?.status, colors, statusIcon])

    React.useEffect(() => {
        if (currentAsset?.healthscore) {
            if (currentAsset?.healthscore >= 80) {
                setHealthColor(colors[3])
            } else if (currentAsset?.healthscore >= 70) {
                setHealthColor(colors[4])
            } else {
                setHealthColor(colors[2])
            }
        }
        
    }, [colors, currentAsset?.healthscore])

    React.useEffect(() => {
        props.loadRequest()
    }, [props])

    React.useEffect(() => {
        props.assets.forEach(asset => {
            asset.id === Number(props.match.params.id) && setCurrentAsset(asset)
        })
    }, [props.assets, props.match.params.id])

    React.useEffect(() => {
        props.units.forEach(unit => {
            unit.id === currentAsset?.companyId && setCurrentUnit(unit)
        })
    }, [props.units, currentAsset?.companyId])
    

    return (
        <div className={classes['asset-container']}>
            {isModalOpen && 
                <SelectAgent 
                    modalHandler={openModal} 
                    asset={currentAsset?.name}
                />
            }
            <div className={classes['assetImg-container']}>
                <img 
                    src={currentAsset?.image} 
                    alt={currentAsset?.name} 
                />
            </div>
            <div className={classes['Asset-mainIcons']}>
                <div style={{color: healthColor}} className={classes['Health-notation']}>
                    <div className={classes['Health-notation--circle']}>
                        <p>{currentAsset?.healthscore}%</p>
                    </div>
                    <FontAwesomeIcon 
                        className={classes['AssetHealthScore']}
                        icon={['fas', 'file-medical-alt']} 
                        size="3x"
                    />
                </div>
                <div className={classes['Status-notation']}>
                    <FontAwesomeIcon 
                        icon={['fas', statusIcon]} 
                        size="3x"
                        color={statusInfo[0]} 
                    />
                </div>
            </div>
            <div className={classes['Asset-healthInfo--container']}>
                <div style={{color: healthColor}} className={classes['Health-notation']}>
                    <h2>Saúde da máquina</h2>
                    <div className={classes['Health-notation--circle']}>
                        <p>{currentAsset?.healthscore}%</p>
                    </div>
                    <FontAwesomeIcon 
                        className={classes['Asset-HealthScore']}
                        icon={['fas', 'file-medical-alt']} 
                        size="3x"
                    />
                </div>
                
                <div className={classes['Status-notation']}>
                    <h2>Status da máquina</h2>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', statusIcon]} 
                            size="5x"
                            color={statusInfo[0]} 
                        />
                        <h3>{statusInfo[1]}</h3>
                    </div>
                </div>
            </div>
            <div className={classes['AssetDetails-container']}>
                <h2>{currentAsset?.name}</h2>
                <div className={classes['Asset-uptime']}>
                    <FontAwesomeIcon 
                        icon={['far', 'clock']} 
                        color={colors[0]} 
                    />
                    <p><span>Tempo ligado:</span> {(currentAsset?.metrics.totalUptime)?.toFixed()} horas</p>
                </div>
                <div>
                    <h3>Detalhes</h3>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'cog']} 
                            color={colors[0]}   
                        />
                        <p><span>Modelo:</span> {capitalize(currentAsset?.model)}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'charging-station']} 
                            color={colors[0]}   
                        />
                        <p><span>Sensores:</span> {currentAsset?.sensors.join(', ')}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'user-cog']} 
                            color={colors[0]}   
                        />
                        {currentAsset?.agent && 
                            <p><span>Responsável:</span> {capitalize('testador um')}</p>
                        }
                        {!currentAsset?.agent && 
                            <React.Fragment>
                                <p><span>Responsável:</span></p>
                                <button onClick={openModal}>Selecione</button>
                            </React.Fragment>
                        }
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['far', 'building']} 
                            color={colors[0]}  
                        />
                        <p><span>Unidade:</span> {capitalize(currentUnit?.name)}</p>
                    </div>
                </div>
                <div>
                    <h3>Especificações Técnicas</h3>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'temperature-high']} 
                            color={colors[0]}   
                        />
                        <p><span>Temperatura Máxima:</span> {currentAsset?.specifications.maxTemp ? `${currentAsset?.specifications.maxTemp}°C` : 'N/A'}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'car-battery']} 
                            color={colors[0]}   
                        />
                        <p><span>Power:</span> {currentAsset?.specifications.power ? `${currentAsset?.specifications.power} kW`: 'N/A'}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'sync-alt']} 
                            color={colors[0]}   
                        />
                        <p><span>RPM:</span> {currentAsset?.specifications.rpm ? currentAsset?.specifications.rpm : 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state: ApplicationState) => ({
    assets: state.assets.assets,
    units: state.assets.units,
})

const mapDispatchToProps = (dispatch: Dispatch) => 
    bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AssetComponent)