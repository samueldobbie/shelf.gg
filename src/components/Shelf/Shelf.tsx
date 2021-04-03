import { useEffect } from 'react'

import Title from '@shelf/helpers/Title'
import './Shelf.css'

function Shelf() {
  // <Redirect from={Endpoint.Any} to={Endpoint.Shelf} />

  useEffect(() => {
    document.title = Title.Shelf
  })

  return (    
    <p>Hello, World!</p>
  )
}

export default Shelf
