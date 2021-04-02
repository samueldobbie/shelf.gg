import { MDBContainer, MDBRow, MDBCol, MDBLink } from 'mdbreact'
import { useEffect } from 'react'

import Title from '@shelf/helpers/Title'
import Endpoint from '@shelf/helpers/Endpoint'
import './Build.css'

function Build() {
  useEffect(() => {
    document.title = Title.Build
  })

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <form>
            <label htmlFor="title" className="grey-text">
              title
            </label>
            <input type="text" id="title" className="form-control" defaultValue="untitled" autoComplete="off"/>
            <br/>

            <label htmlFor="creator" className="grey-text">
              creator
            </label>
            <input type="text" id="creator" className="form-control" defaultValue="anonymous" autoComplete="off"/>
            <br/>

            {/* <label htmlFor="description" className="grey-text">
              Description (optional)
            </label>
            <textarea id="description" className="form-control" />
            <br/> */}

            <label htmlFor="resources" className="grey-text">
              resource list
            </label>
            <textarea id="resources" className="form-control" autoComplete="off"/>

            <MDBLink to={Endpoint.Explore} type="submit" className="text-center mt-4">
              publish
            </MDBLink>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Build
