import React from 'react'

import classes from './Asset.module.css'

import { RouteComponentProps } from 'react-router'

import AssetsService from 'services/assetsService'
import IAssetsData from 'models/AssetsModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-common-types'



type TParams = {id: string}

interface MyComponent extends RouteComponentProps<TParams> {}


const AssetComponent: React.FC<MyComponent> = props => {
    let [currentAsset, setActualAsset] = React.useState<IAssetsData>()
    let [colors, ] = React.useState<string[]>(['#2563eb', '#ffad00', '#ff2e3b', 'green', 'rgb(255, 94, 0)'])
    let [statusIcon, setStatusIcon] = React.useState<IconName>('check-circle')
    let [statusInfo, setStatusInfo] = React.useState<string[]>([colors[0], 'Funcionando'])
    let [healthColor, setHealthColor] = React.useState<string>(colors[3])


    React.useEffect(() => {
        AssetsService.getAsset(props.match.params.id)
            .then(response => setActualAsset(response.data))
    }, [props.match.params.id])

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


    return (
        <div className={classes['asset-container']}>
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
                        <p><span>Modelo:</span> {currentAsset?.model}</p>
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
                        <p><span>Responsável:</span> Zé</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['far', 'building']} 
                            color={colors[0]}  
                        />
                        <p><span>Unidade:</span> {currentAsset?.unitId}</p>
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

export default AssetComponent