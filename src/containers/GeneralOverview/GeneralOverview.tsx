import React, { Component } from 'react'

import AssetsService from '../../services/assetsService'
import IAssetsData from '../../models/AssetsModel'
import IUsersData from '../../models/UsersModel'
import IUnitsData from '../../models/UnitsModel'
import ICompanyData from '../../models/CompanyModel'

import AssetsOverview from '../../components/AssetsOverview/AssetsOverview'
import UsersOverview from '../../components/UsersOverview/UsersOverview'
import UnitsOverview from '../../components/UnitsOverview/UnitsOverview'
import CompanyOverview from '../../components/CompanyOverview/CompanyOverview'


type Props = {}

type State = {
    assets: Array<IAssetsData>,
    users: Array<IUsersData>,
    units: Array<IUnitsData>,
    company: ICompanyData
}


class GeneralOverview extends Component<Props, State> {
    state: State = {
        assets: [],
        users: [],
        units: [],
        company: {id: null, name: null}
    }

    fetchAssets() {
        AssetsService.getAll()
            .then(response => {
                this.setState({
                    assets: response[0].data,
                    users: response[1].data,
                    units: response[2].data,
                    company: response[3].data,
                })
            })
    }

    componentDidMount() {
        this.fetchAssets()
    }
    

    render() {
        return (
            <React.Fragment>
                <h1>ASSETS OVERVIEW</h1>
                <AssetsOverview assets={this.state.assets} />
                <h1>USERS OVERVIEW</h1>
                <UsersOverview users={this.state.users} />
                <h1>UNIDADES OVERVIEW</h1>
                <UnitsOverview units={this.state.units} />
                <h1>EMPRESA OVERVIEW</h1>
                <CompanyOverview company={this.state.company} />
            </React.Fragment>
        )
    }
}

export default GeneralOverview