import React from 'react'

// import classes from './AssetsOverview.module.css'

import { Link } from 'react-router-dom'

// import AssetsService from '../../services/assetsService'
import IAssetsData from '../../models/AssetsModel'


type TAssetsOverview = {
    totalAssets: number,
    assetsInOperation: number,
    assetsInAlert: number,
    assetsInDowntime: number
}

const AssetsOverview: React.FC<{assets: IAssetsData[]}> = props => {
    let [overview, setOverview] = React.useState<TAssetsOverview>({
        totalAssets: 0, 
        assetsInOperation: 0, 
        assetsInAlert: 0, 
        assetsInDowntime: 0
    })
    let [initialMount, setInitialMount] = React.useState<boolean>(true)

    React.useEffect(() => {
        let newOverview = {...overview}

        newOverview.totalAssets = props.assets.length

        props.assets.forEach((asset: IAssetsData) => {
            if (asset.status === 'inOperation') {
                newOverview.assetsInOperation++
            }
            if (asset.status === 'inAlert') {
                newOverview.assetsInAlert++
            }
            if (asset.status === 'inDowntime') {
                newOverview.assetsInDowntime++
            }
        })

        if (props.assets.length > 0 && initialMount) {
            setInitialMount(false)
            setOverview(newOverview)
        }
        
    }, [overview, props.assets, initialMount])


    return (
        <div>
            <Link to={`${process.env.PUBLIC_URL}/assets-list`}>
                <div style={{backgroundColor: '#ccc', cursor: 'pointer'}}>
                    <p>Total: {overview.totalAssets}</p>
                    <p>Funcionando: {overview.assetsInOperation}</p>
                    <p>Em alerta: {overview.assetsInAlert}</p>
                    <p>Paradas: {overview.assetsInDowntime}</p>
                </div>
            </Link>
        </div>
    )
}

export default AssetsOverview