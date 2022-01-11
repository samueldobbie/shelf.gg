import { Card, CardContent, Typography, CardActions, Box, IconButton } from "@mui/material"
import { IResource } from "commons/interfaces/IResource"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

interface IProps {
  resource: IResource
}

function ShelfItem(props: IProps): JSX.Element {
  const { resource } = props

  return (
    <div
      style={{
        marginBottom: "5rem",
        textAlign: "center",
        position: "relative",
        display: "inline-block",
        padding: "0 25px",
      }}
    >
      <div
        style={{
          zIndex: "2px",
          position: "relative",
          transform: "translateY(-15px)",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: "0px",
            margin: "0px",
            display: "grid",
          }}
        >
          <li style={{ justifySelf: "center" }}>
            <Card sx={{ width: 300, height: 350 }}>
              <CardContent sx={{ height: 290 }}>
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

              <CardActions disableSpacing>
                <IconButton
                  onClick={() => window.open(resource.url, "_blank")}
                  sx={{
                    marginLeft: "auto",
                    marginRight: "10px",
                    color: "#4b67ff",
                    backgroundColor: "white",
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </CardActions>
            </Card>
          </li>
        </ul>
      </div>
    
      <ShelfItemShadow />
    </div>
  )
}

function ShelfItemShadow(): JSX.Element {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          width: "100%",
          minWidth: "350px",
          height: "1rem",
          borderRadius: "2px",
          zIndex: "1px",
          boxShadow: "0px -5px 3px 0px rgba(170, 170, 170, 0.2), 0px 15px 20px 0px rgba(170, 170, 170, 0.7), 0px 5px 5px 0px rgba(119, 119, 119, 0.3)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          width: "100%",
          minWidth: "350px",
          height: "1rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "2px",
          zIndex: "3",
        }}
      />
    </>
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
        color: "#4b67ff",
      }}
    >
      •
    </Box>
  )
}

export default ShelfItem
