import React from 'react'

import { Link } from 'react-router-dom'

import AssetsService from '../../services/assetsService'
import IAssetsData from '../../models/AssetsModel'


const AssetsList: React.FC = () => {
    let [assets, setAssets] = React.useState<Array<IAssetsData>>([])

    React.useEffect(() => {
        AssetsService.getAllAssets()
            .then(response => setAssets(response.data))
    }, [])


    return (
        <div>
            <h1>ASSETS LIST</h1>
            {
                assets.map((asset, index) => {
                    return <ul key={`${asset.name}-${index}`}>
                        <Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >
                            <li>{asset.name}</li>
                        </Link>
                    </ul>
                })
            }
        </div>
    )
}

export default AssetsList