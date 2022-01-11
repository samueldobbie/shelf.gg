import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material"
import { IResource } from "commons/interfaces/IResource"

interface IProps {
  resource: IResource
}

function ShelfItem(props: IProps): JSX.Element {
  const { resource } = props

  return (
    <Card sx={{ width: 300, height: 400 }}>
      <CardContent>
        <Typography
          gutterBottom
          color="text.secondary"
          sx={{ fontSize: 14 }}
        >
          {resource.siteName} <BulletPoint /> {resource.siteType}
        </Typography>

        <Typography
          variant="h5"
          component="div"
          gutterBottom
        >
          {resource.siteTitle}
        </Typography>
        
        <Typography sx={{ fontSize: 13 }}>
          {resource.siteDescription}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={() => window.open(resource.url, "_blank")}
          variant="contained"
          sx={{
            position: "absolute",
            right: "10px",
            bottom: "17.5px",
          }}
        >
          Open
        </Button>
      </CardActions>
    </Card>
  )
}


function BulletPoint(): JSX.Element {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        mx: "2px",
        transform: "scale(0.8)",
      }}
    >
      •
    </Box>
  )
}

export default ShelfItem
