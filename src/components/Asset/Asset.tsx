import React from 'react'

import { RouteComponentProps } from 'react-router'

import AssetsService from '../../services/assetsService'
import IAssetsData from '../../models/AssetsModel'


type TParams = {id: string}

interface MyComponent extends RouteComponentProps<TParams> {}


const AssetComponent: React.FC<MyComponent> = props => {
    let [actualAsset, setActualAsset] = React.useState<IAssetsData>()

    React.useEffect(() => {
        AssetsService.getAsset(props.match.params.id)
            .then(response => setActualAsset(response.data))
    }, [props.match.params.id])

    return (
        <div>
            <h1>{actualAsset && actualAsset.name}</h1>

        </div>
    )
}

export default AssetComponent