import React from 'react'

import { Link } from 'react-router-dom'


const Navigation: React.FC = () => {
    return (
        <div style={{display: 'flex'}}>
            <Link to={`${process.env.PUBLIC_URL}/`}>
                <ul>Home</ul>
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/assets-list`}>
                <ul>Ativos</ul>
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/users-list`}>
                <ul>Usuários</ul>
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/units-list`}>
                <ul>Unidades</ul>
            </Link>
        </div>
    )
}

export default Navigation