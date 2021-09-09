import React from 'react'

import classes from './AssetsList.module.css'
// import './AssetsList.css'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import AssetsService from 'services/assetsService'
import IAssetsData from 'models/AssetsModel'


const AssetsList: React.FC = () => {
    let [assets, setAssets] = React.useState<Array<IAssetsData>>([])

    React.useEffect(() => {
        AssetsService.getAllAssets()
            .then(response => setAssets(response.data))
    }, [])

    // console.log(assets)


    return (
        <div className={classes['AssetsList-container']}>
            <h1>ASSETS LIST</h1>
            <table>
                {/* <caption>Statement Summary</caption> */}
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
                        assets.map((asset, index) => {
                            return <tr key={`${asset.name}-${index}`}>
                                {/* <Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} > */}
                                    <td data-label="Id"><Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >{asset.id}</Link></td>
                                    <td data-label="Nome"><Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >{asset.name}</Link></td>
                                    <td data-label="Status"><Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >
                                        {asset.status === 'inOperation' && 
                                            <FontAwesomeIcon 
                                                icon={['fas', 'check-circle']} 
                                                size="2x"
                                                color="#00ce00" 
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
                                    </Link></td>
                                    <td data-label="Saúde"><Link to={`${process.env.PUBLIC_URL}/asset/${asset.id}`} >{asset.healthscore}</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AssetsList