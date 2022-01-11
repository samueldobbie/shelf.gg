import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import { doc, getDoc, increment, setDoc } from "@firebase/firestore"
import { useState } from "@hookstate/core"
import { IResource } from "commons/interfaces/IResource"
import Endpoint from "commons/utils/Endpoint"
import { db } from "commons/utils/Firebase"
import { urlToAlphanumeric } from "commons/utils/UrlToAlpha"
import ShelfItem from "./ShelfItem"

function Shelf(): JSX.Element {
  const { shelfId } = useParams()

  const title = useState("")
  const creator = useState("")
  const views = useState(0)
  const urls = useState([] as string[])
  const resources = useState([] as IResource[])

  const updatePageTitle = (): void => {
    document.title = `${title.value} - shelf.gg`
  }

  const captureView = (): void => {
    const shouldCaptureView = hasViewedCookie() === false     

    if (shouldCaptureView && shelfId) {
      setViewedCookie()
      const docRef = doc(db, "shelves", shelfId)
      setDoc(docRef, { views: increment(1) }, { merge: true })
    }
  }

  const hasViewedCookie = (): boolean => {
    return document.cookie.indexOf("viewedAt=") !== -1
  }

  const setViewedCookie = (): void => {
    const date = new Date()
    const viewedAt = date.toUTCString()
    date.setDate(date.getDate() + 365)
    const expiresAt = date.toUTCString()

    document.cookie = `viewedAt=${viewedAt}; expires=${expiresAt}; path=/s/${shelfId}`
  }

  const updateShelfData = (): void => {
    if (shelfId) {
      const docRef = doc(db, "shelves", shelfId)

      getDoc(docRef)
        .then((doc) => {
          const data = doc.data()

          if (data) {
            title.set(data.title)
            creator.set(data.creator)
            views.set(data.views)
            urls.set(data.urls)
          }
        })
        .catch(() => window.location.href = Endpoint.Client.PageNotFound)
    }
  }

  useEffect(() => {
    captureView()
    updateShelfData()
  }, [])

  useEffect(() => {
    updatePageTitle()
  }, [title.value])

  useEffect(() => {
    async function getResources(): Promise<IResource[]> {
      const retrievedResources = [] as IResource[]
      
      for (const url of urls.value) {
        const docRef = doc(db, "resources", urlToAlphanumeric(url))

        await getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              const data = doc.data()

              if (data) {
                const resource = data as IResource
                retrievedResources.push(resource)
              }
            }
          })
      }

      return retrievedResources
    }

    getResources()
      .then((data) => resources.set(data))
      .catch(() => window.location.href = Endpoint.Client.PageNotFound)
  }, [urls.value])

  return (
    <Container>
      <div
        style={{
          textAlign: "center",
          marginTop: "5%",
        }}
      >
        <h1>{ title.value }</h1>
        <h4>Created by { creator.value }</h4>
        <h4>{ views.value } views</h4>
      </div>

      {resources.value.map((resource) => {
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
                  <ShelfItem resource={resource} />
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

export default Shelf
