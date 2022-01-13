import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import Explore from "pages/explore/Explore"
import ReactDOM from "react-dom"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Endpoint from "./commons/utils/Endpoint"
import Navbar from "./components/navbar/Navbar"
import PageTitle from "./components/page/PageTitle"
import BuildShelf from "./pages/build-shelf/BuildShelf"
import NotFound from "./pages/failure/NotFound"
import Faq from "./pages/faq/Faq"
import Home from "./pages/home/Home"
import Shelf from "./pages/shelf/Shelf"

const theme = createTheme({
  palette: {
    primary: {
      main: "#4b67ff",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: [
      "'Roboto Mono'",
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "'Roboto'",
      "'Oxygen'",
      "'Ubuntu'",
      "'Cantarell'",
      "'Fira Sans'",
      "'Droid Sans'",
      "'Helvetica Neue'",
      "sans-serif",
    ].join(","),
  },
})

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path={Endpoint.Client.Home}
            element={(
              <>
                <PageTitle text="Home" />
                <Home />
              </>
            )}
          />

          <Route
            path={Endpoint.Client.Faq}
            element={(
              <>
                <PageTitle text="FAQ" />
                <Faq />
              </>
            )}
          />

          <Route
            path={Endpoint.Client.Explore}
            element={(
              <>
                <PageTitle text="Explore" />
                <Explore />
              </>
            )}
          />

          <Route
            path={Endpoint.Client.Build}
            element={(
              <>
                <PageTitle text="Build" />
                <BuildShelf />
              </>
            )}
          />

          <Route
            path={Endpoint.Client.Shelf}
            element={(
              <>
                <PageTitle text="Shelf" />
                <Shelf />
              </>
            )}
          />

          <Route
            path={Endpoint.Client.NotFound}
            element={(
              <>
                <PageTitle text="Not Found" />
                <NotFound />
              </>
            )}
          />

          <Route
            path={Endpoint.Client.Any}
            element={(
              <Navigate to={Endpoint.Client.NotFound} />
            )}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"))
