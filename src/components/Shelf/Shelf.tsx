import { useEffect, useState } from 'react'

import { buildTitle } from '@shelf/helpers/Title'
import Endpoint from '@shelf/helpers/Endpoint'
import './Shelf.css'

function Shelf(): JSX.Element {
  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')
  const [views, setViews] = useState(0)
  const [resources, setResources] = useState([])

  useEffect(() => {
    const parameters = window.location.href.split('/s/')
    
    if (parameters.length <= 1) {
      window.location.href = Endpoint.PageNotFound
    }
    
    const id = parameters[1]
    const url = 'http://localhost:5000/api/v1/shelf/' + id
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          const shelf = JSON.parse(data.message)

          document.title = buildTitle(shelf['title'])

          setTitle(shelf['title'])
          setCreator(shelf['creator'])
          setViews(shelf['views'])
          setResources(shelf['resources'])
        } else {
          window.location.href = Endpoint.PageNotFound
        }
      })
  }, [])

  return (
    <>
      <div className="text-center">
        <h1>{ title }</h1>
        <h4>created by { creator }</h4>
        <h4>{ views } views</h4>
      </div>

      <div className="bookshelf">
        <div className="book-grid">
          <ul>
            {resources.map((value) => {
              const base64Image = JSON.parse(value["image"])
              const coverImageSrc = "data:image/png;base64," + atob(base64Image["$binary"])

              return (
                <li key={ value["url"] }>
                  <a href={ value["url"] } target="_blank" rel="noreferrer">
                    <img src={ coverImageSrc } alt="" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="shelf-shadows"></div>
        <div className="shelf"></div>
      </div>
    </>
  )
}

export default Shelf
