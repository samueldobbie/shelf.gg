import Endpoint from "../../commons/Endpoint"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import { doc, getDoc, increment, setDoc } from "@firebase/firestore"
import { db } from "../../commons/Firebase"

function Shelf(): JSX.Element {
  const { shelfId } = useParams()

  const [title, setTitle] = useState("")
  const [creator, setCreator] = useState("")
  const [views, setViews] = useState(0)
  const [urls, setUrls] = useState([] as string[])

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
    date.setTime(date.getTime() + (60 * 60 * 1000))

    // TODO validate

    document.cookie = `viewedAt=${date.toUTCString()}; expires=${date.toUTCString()}; path=/s/${shelfId}`
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

  return (
    <>
      <div className="text-center">
        <h1>{ title }</h1>
        <h4>created by { creator }</h4>
        <h4>{ views } views</h4>
      </div>

      <Container className="shelves-container text-center">
        {urls.map((url) => {
          // const base64Image = JSON.parse(value["image"])
          // const coverImageSrc = "data:image/png;base64," + atob(base64Image["$binary"])

          return (
            <h1>abc</h1>
            // <div className="bookshelf">
            //   <div className="book-grid">
            //     <ul>
            //       <li key={ value["url"] }>
            //         <a href={ value["url"] } target="_blank" rel="noreferrer">
            //           <img src={ coverImageSrc } alt="" />
            //         </a>
            //       </li>
            //     </ul>
            //   </div>
            //   <div className="shelf-shadows"></div>
            //   <div className="shelf"></div>
            // </div>
          )
        })}
      </Container>
    </>
  )
}

export default Shelf
