import Endpoint from "../../commons/Endpoint"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import { doc, getDoc, increment, setDoc } from "@firebase/firestore"
import { db } from "../../commons/Firebase"

interface TitleAndDomain {
  title: string
  domain: string
}

function Shelf(): JSX.Element {
  const { shelfId } = useParams()

  const [title, setTitle] = useState("")
  const [creator, setCreator] = useState("")
  const [views, setViews] = useState(0)
  const [urls, setUrls] = useState([] as string[])
  const [titlesAndDomains, setTitlesAndDomains] = useState([] as TitleAndDomain[])

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
    fetch(Endpoint.Server.ExtractMetaData, {
      method: "POST",
      body: JSON.stringify({ urls }),
    })
      .then((response) => response.json())
      .then((data) => setTitlesAndDomains(data["result"]))
  }, [urls])

  return (
    <>
      <div className="text-center">
        <h1>{ title }</h1>
        <h4>created by { creator }</h4>
        <h4>{ views } views</h4>
      </div>

      <Container className="shelves-container text-center">
        {titlesAndDomains.map((item) => {
          // const base64Image = JSON.parse(value["image"])
          // const coverImageSrc = "data:image/png;base64," + atob(base64Image["$binary"])

          return (
            <>
              <h1>{item.title}</h1>
              <h1>{item.domain}</h1>
              {/* // <div className="bookshelf">
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
              // </div> */}
            </>
          )
        })}
      </Container>
    </>
  )
}

export default Shelf
