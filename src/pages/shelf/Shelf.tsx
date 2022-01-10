import Endpoint from "../../commons/Endpoint"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Box, Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material"
import { doc, getDoc, increment, setDoc } from "@firebase/firestore"
import { db } from "../../commons/Firebase"

interface Resource {
  url: string
  siteTitle: string
  siteType: string
  siteName: string
  siteDescription: string
  siteImage: string
}

function Shelf(): JSX.Element {
  const { shelfId } = useParams()

  const [title, setTitle] = useState("")
  const [creator, setCreator] = useState("")
  const [views, setViews] = useState(0)
  const [urls, setUrls] = useState([] as string[])
  const [resources, setResources] = useState([] as Resource[])

  const updatePageTitle = () => {
    document.title = `${title} - shelf.gg`
  }

  const captureView = () => {
    const shouldCaptureView = hasViewedCookie() === false     

    if (shouldCaptureView && shelfId) {
      setViewedCookie()
      const docRef = doc(db, "shelves", shelfId)
      setDoc(docRef, { views: increment(1) }, { merge: true })
    }
  }

  function hasViewedCookie(): boolean {
    return document.cookie.indexOf("viewedAt=") !== -1
  }

  function setViewedCookie(): void {
    const date = new Date()
    const viewedAt = date.toUTCString()
    date.setDate(date.getDate() + 365)
    const expiresAt = date.toUTCString()

    document.cookie = `viewedAt=${viewedAt}; expires=${expiresAt}; path=/s/${shelfId}`
  }

  const getShelf = () => {
    if (shelfId) {
      const docRef = doc(db, "shelves", shelfId)

      getDoc(docRef)
        .then((doc) => {
          const data = doc.data()

          if (data) {
            setTitle(data.title)
            setCreator(data.creator)
            setViews(data.views)
            setUrls(data.urls)
          }
        })
        .catch(() => window.location.href = Endpoint.Client.PageNotFound)
    }
  }

  useEffect(() => {
    captureView()
    getShelf()
  }, [])

  useEffect(() => {
    updatePageTitle()
  }, [title])

  useEffect(() => {
    fetch(Endpoint.Server.ExtractMetaData, {
      method: "POST",
      body: JSON.stringify({ urls }),
    })
      .then((response) => response.json())
      .then((data) => setResources(data["result"]))
  }, [urls])

  return (
    <Container>
      <div style={{ textAlign: "center", marginTop: "5%" }}>
        <h1>{ title }</h1>
        <h4>Created by { creator }</h4>
        <h4>{ views } views</h4>
      </div>

      {resources.map((resource) => {
        return (
          <div
            key={resource.url}
            style={{
              width: "30%",
              margin: "5rem auto",
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
                  <BasicCard resource={resource} />
                </li>
              </ul>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                left: "0px",
                width: "100%",
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
                height: "1rem",
                backgroundColor: "#f9f9f9",
                borderRadius: "2px",
                zIndex: "3",
              }}
            />
          </div>            
        )
      })}
    </Container>
  )
}

interface IBasicCardProps {
  resource: Resource
}

function BasicCard(props: IBasicCardProps) {
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

export default Shelf
