import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Nav from '@shelf/components/Nav/Nav'
import Endpoint from '@shelf/helpers/Endpoint'
import Home from '@shelf/components/Home/Home'
import Faq from '@shelf/components/Faq/Faq'
import Build from '@shelf/components/Build/Build'
import Shelf from '@shelf/components/Shelf/Shelf'
import Explore from '@shelf/components/Explore/Explore'
import PageNotFound from '@shelf/components/Failure/PageNotFound/PageNotFound'
import './App.css'

function App(): JSX.Element {
  return (
    <Router>
      <Nav/>

      <Switch>
        <Route path={Endpoint.Home} exact component={Home} />
        <Route path={Endpoint.Faq} exact component={Faq} />
        <Route path={Endpoint.Build} exact component={Build} />
        <Route path={Endpoint.Shelf} exact component={Shelf} />
        <Route path={Endpoint.Explore} exact component={Explore} />
        <Route path={Endpoint.PageNotFound} component={PageNotFound} />
        <Redirect from={Endpoint.Any} to={Endpoint.PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
