import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Navbar from "@shelf/components/Navbar/Navbar"
import Endpoint from "@shelf/helpers/Endpoint"
import Home from "@shelf/components/Home/Home"
import Faq from "@shelf/components/Faq/Faq"
import Build from "@shelf/components/Build/Build"
import Shelf from "@shelf/components/Shelf/Shelf"
import Explore from "@shelf/components/Explore/Explore"
import PageNotFound from "@shelf/components/Failure/PageNotFound/PageNotFound"

function App(): JSX.Element {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route
          path={Endpoint.Client.Home}
          component={Home}
          exact
        />

        <Route
          path={Endpoint.Client.Faq}
          component={Faq}
          exact
        />

        <Route
          path={Endpoint.Client.Build}
          component={Build}
          exact
        />

        <Route
          path={Endpoint.Client.Shelf}
          component={Shelf}
          exact
        />

        <Route
          path={Endpoint.Client.Explore}
          component={Explore}
          exact
        />

        <Route
          path={Endpoint.Client.PageNotFound}
          component={PageNotFound}
        />

        <Redirect
          to={Endpoint.Client.PageNotFound}
          from={Endpoint.Client.Any}
        />
      </Switch>
    </Router>
  )
}

export default App
