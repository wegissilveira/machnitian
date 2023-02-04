import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Layout from 'containers/Layout/Layout'
import GeneralOverview from 'containers/GeneralOverview/GeneralOverview'
import CompanyInfo from './components/CompanyInfo/CompanyInfo'
import AssetsList from 'pages/AssetsList/AssetsList'
import AssetComponent from 'pages/AssetComponent/AssetComponent'
import UsersLIst from 'pages/UsersList/UsersList'
import UserModal from 'pages/UsersList/UserModal/UserModal'
import UnitsList from 'pages/UnitsList/UnitsList'

import store from 'store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)


const  App = () =>  {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/`} exact component={GeneralOverview} />
            <Route path={`${process.env.PUBLIC_URL}/company`} exact component={CompanyInfo} />
            <Route path={`${process.env.PUBLIC_URL}/assets-list`} exact component={AssetsList} />
            <Route path={`${process.env.PUBLIC_URL}/assets-list`} exact component={AssetsList} />
            <Route path={`${process.env.PUBLIC_URL}/assets-list/asset/:id`} component={AssetComponent} />
            <Route path={`${process.env.PUBLIC_URL}/users-list/`} exact component={UsersLIst} />
            <Route path={`${process.env.PUBLIC_URL}/user/:id`} exact component={UserModal} />
            <Route path={`${process.env.PUBLIC_URL}/units-list/`} exact component={UnitsList} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
