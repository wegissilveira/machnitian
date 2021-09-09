import React from 'react'

import classes from './AssetsReport.module.css'

import TAssetsReport from '../../../models/AssetsReportModel'


const AssetsReport: React.FC<{assetsReport: TAssetsReport}> = props => {
    return (
        <div className={classes['assetsReport-container']}>
            <p>Total: {props.assetsReport.totalAssets}</p>
            <p>Funcionando: {props.assetsReport.assetsInOperation}</p>
            <p>Em alerta: {props.assetsReport.assetsInAlert}</p>
            <p>Paradas: {props.assetsReport.assetsInDowntime}</p>
        </div>
    )
}

export default AssetsReport