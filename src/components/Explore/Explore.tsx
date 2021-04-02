import { useEffect } from 'react'

import Title from '@shelf/helpers/Title'
import './Explore.css'

function Explore() {
  useEffect(() => {
    document.title = Title.Explore
  })

  return (    
    <p>Hello, World!</p>
  )
}

export default Explore
