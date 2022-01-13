import { Button, Grid, Typography } from "@mui/material"
import Endpoint from "commons/utils/Endpoint"

function NotFound(): JSX.Element {
  const handleReturnHome = (): void => {
    window.location.href = Endpoint.Client.Home
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: "10%" }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold" }}>
        404
      </Typography>
            
      <Typography>
        How did you end up here? 😲
      </Typography>
            
      <Button
        onClick={handleReturnHome}
        variant="contained"
        sx={{
          my: 3,
          fontWeight: "bold",
        }}
      >
        Return home
      </Button>
    </Grid> 
  )
}

export default NotFound
