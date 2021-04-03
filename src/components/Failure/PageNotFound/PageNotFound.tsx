import { useEffect } from 'react'
import { MDBLink } from 'mdbreact'

import Endpoint from '@shelf/helpers/Endpoint'
import Title from '@shelf/helpers/Title'
import './PageNotFound.css'

function PageNotFound(): JSX.Element {
  useEffect(() => {
    document.title = Title.PageNotFound
  })

  return (
  	<div className="container-fluid">
  		<div className="col-md-6 offset-md-3 text-center mt-5 pt-5">
  			<div className="text-center">
          <h1 className="display-1 align-items-center message-font">404</h1>
          <h3 className="md-0">how'd you end up here?...</h3>
          <MDBLink to={Endpoint.Home} color="indigo">take me home</MDBLink>
        </div>
  	 </div>
  	</div>
  )
}

export default PageNotFound
