import Layout from './containers/GeneralOverview/Layout/Layout'
import GeneralOverview from './containers/GeneralOverview/GeneralOverview'
// import AssetsOverview from './components/AssetsOverview/AssetsOverview'
import AssetsList from './components/AssetsList/AssetsList'
import Asset from './components/Asset/Asset'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UsersLIst from './components/UsersList/UsersList'
import User from './components/User/User'
import UnitsList from './components/UnitsList/UnitsList'
import Unity from './components/Unity/Unity'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/`} exact component={GeneralOverview} />
          {/* <Route path={`${process.env.PUBLIC_URL}/`} exact component={AssetsOverview} /> */}
          <Route path={`${process.env.PUBLIC_URL}/assets-list`} exact component={AssetsList} />
          <Route path={`${process.env.PUBLIC_URL}/asset/:id`} exact component={Asset} />
          <Route path={`${process.env.PUBLIC_URL}/users-list/`} exact component={UsersLIst} />
          <Route path={`${process.env.PUBLIC_URL}/user/:id`} exact component={User} />
          <Route path={`${process.env.PUBLIC_URL}/units-list/`} exact component={UnitsList} />
          <Route path={`${process.env.PUBLIC_URL}/unity/:id`} exact component={Unity} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
