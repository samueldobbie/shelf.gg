import { Box, Typography, Button } from "@mui/material"
import Endpoint from "../../commons/Endpoint"
import { Link } from "react-router-dom"
import ShelfTable from "../../components/shelf-table/ShelfTable"

function Home(): JSX.Element {
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
            to={Endpoint.Client.Build}
            sx={{ fontWeight: "bold" }}
          >
            Build a Shelf
          </Button>
        </div>
      </Box>

      {/* NEWEST SHELVES */}
      <Box>
        <ShelfTable />
      </Box>

      {/* MOST POPULAR SHELVES */}
      <Box sx={{ my: "8%" }}>
        <ShelfTable />
      </Box>
    </div>
  )
}

export default Home
