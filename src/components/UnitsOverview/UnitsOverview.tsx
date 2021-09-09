import React from 'react'

// import classes from './AssetsOverview.module.css'

import IUnitsData from '../../models/UnitsModel'

import { Link } from 'react-router-dom'


const UnitsOverview: React.FC<{units: IUnitsData[]}> = props => {
    let [totalUnits, setTotalUnits] = React.useState<number>(0)

    React.useEffect(() => {
        setTotalUnits(props.units.length)        
    }, [props.units])

    return (
        <Link to={`${process.env.PUBLIC_URL}/units-list`}>
            <div style={{backgroundColor: '#CCC', cursor: 'pointer'}}>
                <p>Total: {totalUnits}</p>
            </div>
        </Link>
    )
}

export default UnitsOverview