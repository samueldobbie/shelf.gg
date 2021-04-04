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
            <li>
              <img alt="" src="https://images-na.ssl-images-amazon.com/images/I/51uLvJlKpNL._SX321_BO1,204,203,200_.jpg"/>
            </li>
            <li>
              <img alt="" src="https://damonza.com/wp-content/uploads/portfolio/fiction/The-prophecy_03.jpg"/>
            </li>
            <li>
              <img alt="" src="https://i.pinimg.com/564x/f7/c8/12/f7c812c9b0296cd9f119e33a06d9a256.jpg"/>
            </li>
          </ul>
        </div>
        <div className="shelf-shadows"></div>
        <div className="shelf"></div>
      </div>
      <div className="bookshelf">
        <div className="book-grid">
          <ul>
            <li>
              <img alt="" src="https://images.penguinrandomhouse.com/cover/9781101931288"/>
            </li>
            <li>
              <img alt="" src="https://i.harperapps.com/covers/9780062698162/x510.jpg"/>
            </li>
            <li>
              <img alt="" src="https://www.canva.com/learn/wp-content/uploads/2015/03/draculabramstoker-tb-800x0.jpg"/>
            </li>
          </ul>
        </div>
        <div className="shelf-shadows"></div>
        <div className="shelf"></div>
      </div>
    </>
  )
}

export default Shelf
