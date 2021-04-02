import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Endpoint from '@shelf/helpers/Endpoint'
import Nav from '@shelf/components/Nav/Nav'
import Home from '@shelf/components/Home/Home'
import PageNotFound from '@shelf/components/Failure/PageNotFound/PageNotFound'
import './App.css'

function App() {
  return (
    <Router>
      <Nav/>

      <Switch>
        <Route path={Endpoint.Home} exact component={Home} />
        <Route path={Endpoint.Faq} exact component={Home} />
        <Route path={Endpoint.Build} exact component={Home} />
        <Route path={Endpoint.Explore} exact component={Home} />
        <Route path={Endpoint.PageNotFound} component={PageNotFound} />
        <Redirect from={Endpoint.Any} to={Endpoint.PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
