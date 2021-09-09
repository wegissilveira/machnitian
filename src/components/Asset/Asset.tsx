import React from 'react'

import classes from './Asset.module.css'

import { RouteComponentProps } from 'react-router'

import AssetsService from '../../services/assetsService'
import IAssetsData from '../../models/AssetsModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


type TParams = {id: string}

interface MyComponent extends RouteComponentProps<TParams> {}


const AssetComponent: React.FC<MyComponent> = props => {
    let [currentAsset, setActualAsset] = React.useState<IAssetsData>()

    React.useEffect(() => {
        AssetsService.getAsset(props.match.params.id)
            .then(response => setActualAsset(response.data))
    }, [props.match.params.id])

    console.log(currentAsset)

    return (
        <div>
            
            <div className={classes['assetImg-container']}>
                <img 
                    src={currentAsset?.image} 
                    alt={currentAsset?.name} 
                />
            </div>
            <div className={classes['Asset-mainIcons']}>
                <div className={classes['health-notation']}>
                    <div className={classes['health-notation--circle']}>
                        <p>{currentAsset?.healthscore}%</p>
                    </div>
                    <FontAwesomeIcon 
                        className={classes['AssetHealthScore']}
                        icon={['fas', 'file-medical-alt']} 
                        size="3x"
                    />
                </div>
                <div className={classes['status-notation']}>
                    {currentAsset?.status === 'inOperation' && 
                        <FontAwesomeIcon 
                            icon={['fas', 'check-circle']} 
                            size="3x"
                            color="#2563eb" 
                        />
                    }
                    {currentAsset?.status === 'inAlert' && 
                        <FontAwesomeIcon 
                            icon={['fas', 'exclamation-triangle']} 
                            size="3x"
                            color="#ffad00" 
                        />
                    }
                    {currentAsset?.status === 'inDowntime' && 
                        <FontAwesomeIcon 
                            icon={['fas', 'minus-square']} 
                            size="3x"
                            color="#ff2e3b" 
                        />
                    }
                </div>
            </div>
            <div className={classes['AssetDetails-container']}>
                <h2>{currentAsset?.name}</h2>
                <div className={classes['Asset-uptime']}>
                    <FontAwesomeIcon 
                        icon={['far', 'clock']} 
                        color="#2563eb" 
                    />
                    <p><span>Tempo ligado:</span> {(currentAsset?.metrics.totalUptime)?.toFixed()} horas</p>
                </div>
                <div>
                    <h3>Detalhes</h3>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'cog']} 
                            color="#2563eb"  
                        />
                        <p><span>Modelo:</span> {currentAsset?.model}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'charging-station']} 
                            color="#2563eb"  
                        />
                        <p><span>Sensores:</span> {currentAsset?.sensors.join(', ')}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'user-cog']} 
                            color="#2563eb"  
                        />
                        <p><span>Responsável:</span> Zé</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['far', 'building']} 
                            color="#2563eb"  
                        />
                        <p><span>Unidade:</span> {currentAsset?.unitId}</p>
                    </div>
                </div>
                <div>
                    <h3>Especificações Técnicas</h3>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'temperature-high']} 
                            color="#2563eb"  
                        />
                        <p><span>Temperatura Máxima:</span> {currentAsset?.specifications.maxTemp ? `${currentAsset?.specifications.maxTemp}°C` : 'N/A'}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'car-battery']} 
                            color="#2563eb"  
                        />
                        <p><span>Power:</span> {currentAsset?.specifications.power ? `${currentAsset?.specifications.power} kW`: 'N/A'}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'sync-alt']} 
                            color="#2563eb"  
                        />
                        <p><span>RPM:</span> {currentAsset?.specifications.rpm ? currentAsset?.specifications.rpm : 'N/A'}</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AssetComponent