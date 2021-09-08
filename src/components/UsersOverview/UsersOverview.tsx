import React from 'react'

// import classes from './AssetsOverview.module.css'

import IUsersData from '../../models/UsersModel'

import { Link } from 'react-router-dom'


const UsersOverview: React.FC<{users: IUsersData[]}> = props => {
    let [totalUsers, setTotalUsers] = React.useState<number>(0)

    React.useEffect(() => {
        setTotalUsers(props.users.length)        
    }, [props.users])

    return (
        <Link to={`${process.env.PUBLIC_URL}/users-list`}>
            <div style={{backgroundColor: '#CCC', cursor: 'pointer'}}>
                <p>Total: {totalUsers}</p>
            </div>
        </Link>
    )
}

export default UsersOverview