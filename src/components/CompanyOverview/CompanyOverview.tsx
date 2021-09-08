import React from 'react'

// import classes from './AssetsOverview.module.css'

import ICompanyData from '../../models/CompanyModel'

import { Link } from 'react-router-dom'


const CompanyOverview: React.FC<{company: ICompanyData}> = props => {
    let [companyName, setCompanyName] = React.useState<string | null>('')

    React.useEffect(() => {
        setCompanyName(props.company.name)        
    }, [props.company])

    return (
        <Link to={`${process.env.PUBLIC_URL}/users-list`}>
            <div style={{backgroundColor: '#CCC', cursor: 'pointer'}}>
                <p>Nome: {companyName}</p>
            </div>
        </Link>
    )
}

export default CompanyOverview