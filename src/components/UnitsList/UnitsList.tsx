import React from 'react'

import classes from './UnitsList.module.css'

import AssetsService from 'services/assetsService'
import IUnitsData from 'models/UnitsModel'


const UnitsList: React.FC = () => {
    let [units, setUnits] = React.useState<Array<IUnitsData>>([])

    React.useEffect(() => {
        AssetsService.getAllUnits()
            .then(response => setUnits(response.data))
    }, [])

    console.log(units)


    return (
        <div className={classes['UnitsList-container']}>
            <h1>LISTA DE USUÁRIOS</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        units.map((unit, index) => {
                            return (
                                <tr key={`${unit.name}-${index}`}
                                >
                                    <td data-label="Id">{unit.id}</td>
                                    <td data-label="Nome">{unit.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UnitsList