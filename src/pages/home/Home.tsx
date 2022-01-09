import { Box, Typography, Button } from "@mui/material"
import Endpoint from "../../commons/Endpoint"
import { Link } from "react-router-dom"

function Home(): JSX.Element {
  // <MDBJumbotron className="text-center">
  //   <MDBCardBody>
  //     <MDBCardTitle className="h1">
  //       shelf.gg
  //     </MDBCardTitle>
  //     <br/>

  //     <MDBCardText>
  //       create, share, and find resources
  //     </MDBCardText>
  //     <br/>

  //     <div className="pt-2">
  //       <MDBLink to={Endpoint.Client.Build} className="landing-btn secondary">
  //         build
  //       </MDBLink>

  //       <MDBLink to={Endpoint.Client.Explore} className="landing-btn">
  //         explore
  //       </MDBLink>
  //     </div>
  //   </MDBCardBody>
  // </MDBJumbotron>

  return (
    <div style={{ overflow: "hidden" }}>
      <Box
        sx={{
          my: "8%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontSize: 50,
            fontWeight: "bold",
            lineHeight: 1.5,
          }}
        >
          shelf
          <span style={{ color: "#4b67ff" }}>
            .
          </span>
          gg
        </Typography>

        <Typography
          paragraph
          gutterBottom
          sx={{
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1.5,
            opacity: "60%",
          }}
        >
          Find and share lists of resources
        </Typography>

        <div style={{ marginTop: "50px" }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to={Endpoint.Client.Explore}
            sx={{
              fontWeight: "bold",
              marginRight: 2,
            }}
          >
            Explore Shelves
          </Button>

          <Button
            variant="outlined"
            size="large"
            component={Link}
            to={Endpoint.Client.Create}
            sx={{ fontWeight: "bold" }}
          >
            Create a Shelf
          </Button>
        </div>
      </Box>

      {/* NEWEST SHELVES */}

      {/* MOST POPULAR SHELVES */}
    </div>
  )
}

export default Home
