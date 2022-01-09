import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Endpoint from "./commons/Endpoint"
import PageTitle from "./commons/PageTitle"
import Navbar from "./components/navbar/Navbar"
import Create from "./pages/create/Create"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/failure/PageNotFound"
import Faq from "./pages/faq/Faq"
import Home from "./pages/home/Home"

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
            path={Endpoint.Client.Create}
            element={(
              <>
                <PageTitle text="Build" />
                <Create />
              </>
            )}
          />

          {/*
          <Route
            path={"Endpoint.Client.Shelf"}
            element={(
              <>
                <PageTitle text="Shelf" />
                <ForgotPassword />
              </>
            )}
          /> */}

          <Route
            path={Endpoint.Client.PageNotFound}
            element={(
              <>
                <PageTitle text="Page Not Found" />
                <PageNotFound />
              </>
            )}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"))
