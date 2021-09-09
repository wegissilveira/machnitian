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
            <div className={classes['health-notation']}>
                <div className={classes['health-notation--circle']}>
                    <p>{currentAsset?.healthscore}%</p>
                </div>
                <FontAwesomeIcon icon={['fas', 'file-medical-alt']}  size="3x"/>
            </div>
            <h1>{currentAsset?.name}</h1>
        </div>
    )
}

export default AssetComponent