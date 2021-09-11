import React from 'react'

import classes from './Overview.module.css'

import IUsersData from 'models/UsersModel'
import ICompanyData from 'models/CompanyModel'
import IUnitsData from 'models/UnitsModel'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const UsersOverview: React.FC<{
    values: IUsersData[] | ICompanyData[] | IUnitsData[],
    title: string,
    link: string
}> = props => {
    
    let [header, setHeader] = React.useState<number | string | null>(0)

    React.useEffect(() => {
        if (props.title !== 'Empresa') {
            setHeader(props.values.length)
        } else {
            let companyName: ''
            const value: any[] = Object.values(props.values)
            companyName = value[1]
            setHeader(companyName)
        }
    }, [props.values, props.title])


    return (
        <React.Fragment>
            {props.title !== 'Empresa' &&
                <Link to={`${process.env.PUBLIC_URL}/${props.link}`}>
                    <div className={classes['Overview-container']}>
                        <p><span>{props.title}:</span> {header}</p>
                        <FontAwesomeIcon icon={['fas', 'eye']} color="#1e3c8f"/>
                    </div>
                </Link>
            }
            {props.title === 'Empresa' &&
                <div className={classes['Overview-container']}>
                    <p><span>{props.title}:</span> {header}</p>
                </div>
            }
        </React.Fragment>
        
    )
}

export default UsersOverview