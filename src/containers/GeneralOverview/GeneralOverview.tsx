import React, { Component } from 'react'

import * as AssetsActions from 'store/ducks/assets/actions'
import { ApplicationState } from 'store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import classes from './GeneralOverview.module.css'

import IAssetsData from 'models/AssetsModel'
import IUsersData from 'models/UsersModel'
import IUnitsData from 'models/UnitsModel'
import ICompanyData from 'models/CompanyModel'

import AssetsOverview from 'components/AssetsOverview/AssetsOverview'
import Overview from 'components/Overview/Overview'


interface StateProps {
    assets: Array<IAssetsData>,
    users: Array<IUsersData>,
    units: Array<IUnitsData>,
    company: Array<ICompanyData>,
}

interface DispatchProps {
    loadRequest(): void
}

type Props = StateProps & DispatchProps

class GeneralOverview extends Component<Props> {
    componentDidMount() {
        const { loadRequest } = this.props
        loadRequest()
    }
    

    render() {
        const { assets, users, units, company } = this.props

        return (
            <React.Fragment>
                <AssetsOverview assets={assets} />
                <h1 className={classes['Overview-title']}>EMPRESA</h1>
                <Overview title={'Empresa'} link={'/'} values={company}/>
                <Overview title={'Unidades'} link={'units-list'} values={units}/>
                <Overview title={'Usuários'} link={'users-list'} values={users}/>
           </React.Fragment>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    assets: state.assets.assets,
    users: state.assets.users,
    units: state.assets.units,
    company: state.assets.company,
})

const mapDispatchToProps = (dispatch: Dispatch) => 
bindActionCreators(AssetsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GeneralOverview)