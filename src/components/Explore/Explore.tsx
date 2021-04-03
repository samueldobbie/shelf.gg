import { useEffect } from 'react'

import Title from '@shelf/helpers/Title'
import './Explore.css'

function Explore(): JSX.Element {
  useEffect(() => {
    document.title = Title.Explore
  })

  return (    
    <p>Hello, World!</p>
  )
}

export default Explore
