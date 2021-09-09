import React, { Component } from 'react'

import classes from './GeneralOverview.module.css'

import AssetsService from 'services/assetsService'
import IAssetsData from 'models/AssetsModel'
import IUsersData from 'models/UsersModel'
import IUnitsData from 'models/UnitsModel'
import ICompanyData from 'models/CompanyModel'

import AssetsOverview from 'components/AssetsOverview/AssetsOverview'
// import UsersOverview from 'components/UsersOverview/UsersOverview'
// import UnitsOverview from 'components/UnitsOverview/UnitsOverview'
// import CompanyOverview from '../../components/CompanyOverview/CompanyOverview'
// import CompanyOverview from 'components/CompanyOverview/CompanyOverview'
import Overview from 'components/Overview/Overview'


type Props = {}

type State = {
    assets: Array<IAssetsData>,
    users: Array<IUsersData>,
    units: Array<IUnitsData>,
    company: Array<ICompanyData>
}


class GeneralOverview extends Component<Props, State> {
    state: State = {
        assets: [],
        users: [],
        units: [],
        company: []
    }

    fetchAssets() {
        AssetsService.getAll()
            .then(response => {
                this.setState({
                    assets: response[0].data,
                    users: response[1].data,
                    units: response[2].data,
                    company: [response[3].data],
                })
            })
    }

    componentDidMount() {
        this.fetchAssets()
    }
    

    render() {
        return (
            <React.Fragment>
                <AssetsOverview assets={this.state.assets} />
                <h1 className={classes['Overview-title']}>EMPRESA</h1>
                <Overview title={'Empresa'} link={'/'} values={this.state.company}/>
                <Overview title={'Unidades'} link={'units-list'} values={this.state.units}/>
                <Overview title={'Usuários'} link={'users-list'} values={this.state.users}/>
            </React.Fragment>
        )
    }
}

export default GeneralOverview