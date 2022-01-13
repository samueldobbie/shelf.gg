import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import { doc, getDoc, increment, setDoc } from "@firebase/firestore"
import { Downgraded, useState } from "@hookstate/core"
import { IResource } from "commons/interfaces/IResource"
import Endpoint from "commons/utils/Endpoint"
import { db } from "commons/utils/Firebase"
import { urlToAlphanumeric } from "commons/utils/UrlToAlpha"
import ShelfItem from "./ShelfItem"
import ShelfTitle from "./ShelfTitle"

function Shelf(): JSX.Element {
  const { shelfId } = useParams()

  const title = useState("")
  const creator = useState("")
  const views = useState(0)
  const urls = useState([] as string[])
  const resources = useState([] as IResource[])

  const titleValue = title.value
  const urlsValue = urls.attach(Downgraded).value

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
          if (doc.exists()) {
            const data = doc.data()
  
            if (data) {
              title.set(data.title)
              creator.set(data.creator)
              views.set(data.views)
              urls.set(data.urls)
            }
          } else {
            alert("Shelf doesn't exist")
            moveTo404()
          }
        })
        .catch(() => moveTo404())
    }
  }

  const moveTo404 = (): void => {
    window.location.href = Endpoint.Client.NotFound
  }

  useEffect(() => {
    captureView()
    updateShelfData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updatePageTitle()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue])

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
      .catch(() => moveTo404())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlsValue])

  return (
    <Container>
      <ShelfTitle
        title={title.value}
        creator={creator.value}
        views={views.value}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        {resources.value.map((resource) => {
          return (
            <ShelfItem
              key={resource.url}
              resource={resource}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default Shelf
