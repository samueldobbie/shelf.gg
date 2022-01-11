import { AppBar, Button, Container, Toolbar } from "@mui/material"
import { Link } from "react-router-dom"
import { Box } from "@mui/system"
import GitHubButton from "react-github-btn"
import Endpoint from "commons/utils/Endpoint"

function Navbar(): JSX.Element {
  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Container disableGutters>
        <Toolbar>
          <Button
            component={Link}
            to={Endpoint.Client.Home}
            sx={{
              fontSize: 24,
              color: "text.primary",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            shelf
            <span style={{ color: "#4b67ff" }}>
              .
            </span>
            gg
          </Button>

          <Box
            component="div"
            sx={{ flexGrow: 1 }}
          />

          <Button
            component={Link}
            to={Endpoint.Client.Faq}
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              textTransform: "none",
              fontSize: 16,
              marginRight: 2,
            }}
          >
            Faq
          </Button>

          <Button
            component={Link}
            to={Endpoint.Client.Explore}
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              textTransform: "none",
              fontSize: 16,
              marginRight: 2,
            }}
          >
            Explore
          </Button>

          <Button
            component={Link}
            to={Endpoint.Client.Build}
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              textTransform: "none",
              fontSize: 16,
              marginRight: 2,
            }}
          >
            Build
          </Button>

          <Button
              sx={{
                color: "transparent",
                backgroundColor: "transparent",
                marginTop: 1,
                cursor: "default",
                marginLeft: 2,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <GitHubButton
                href={Endpoint.External.GitHubRepo}
                data-size="large"
                data-show-count="true"
              >
                Star
              </GitHubButton>
            </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
