import React from 'react'

import classes from './NavigationMobile.module.css'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const NavigationMobile: React.FC = () => {
    let [translateMenuValue, setTranslateMenuValue] = React.useState<number>(-100)

    const translateMenu = {
        transform: `translateY(${translateMenuValue}%)`,
        transition: '.4s ease-in-out'
    }

    const mobileMenuHandler = (): void => {
        if (translateMenuValue === 0) {
            setTranslateMenuValue(-100)
        } else {
            setTranslateMenuValue(0)
        }
    }


    return (
        <div className={classes['NavigationMobile-container']}>
            <FontAwesomeIcon 
                icon="bars" size="2x" 
                onClick={mobileMenuHandler}
            />
            <div 
                style={translateMenu}
                className={classes['NavigationMobile-subContainer']}
                onClick={mobileMenuHandler}
            >
                <h1>TRACTIAN</h1>
                <FontAwesomeIcon 
                    icon="times" size="2x" 
                />
                <div className={classes['NavigationMobile-links']}>
                    <Link to={`${process.env.PUBLIC_URL}/`}>
                        Overview
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/assets-list`}>
                        Ativos
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/users-list`}>
                        Usuários
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/units-list`}>
                        Unidades
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavigationMobile