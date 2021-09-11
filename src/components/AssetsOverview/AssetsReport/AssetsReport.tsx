import React from 'react'

import classes from './AssetsReport.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import TAssetsReport from 'models/AssetsReportModel'


const AssetsReport: React.FC<{assetsReport: TAssetsReport}> = props => {
    return (
        <div className={classes['assetsReport-container']}>
            <p><span>Total:</span> {props.assetsReport.totalAssets} assets</p>
            <p><FontAwesomeIcon icon={['fas', 'check-circle']} color="#2563eb" /> <span> Funcionando:</span> {props.assetsReport.assetsInOperation} assets</p>
            <p><FontAwesomeIcon icon={['fas', 'exclamation-triangle']} color="#ffad00"/> <span> Em alerta:</span> {props.assetsReport.assetsInAlert} assets</p>
            <p><FontAwesomeIcon icon={['fas', 'minus-square']} color="#ff2e3b"/> <span> Paradas:</span> {props.assetsReport.assetsInDowntime} assets</p>
        </div>
    )
}

export default AssetsReport