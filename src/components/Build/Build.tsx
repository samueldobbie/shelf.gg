import { MDBContainer, MDBRow, MDBCol, MDBLink } from 'mdbreact'
import { useEffect } from 'react'

import Title from '@shelf/helpers/Title'
import './Build.css'

function Build() {
  useEffect(() => {
    document.title = Title.Build
  })

  const submitted = async () => {
    const response = await fetch('h', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'a': 'b',
        'c': 'd',
        'e': 'f',
      }),
    })
    return response.json()
  }

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
            <textarea id="resources" className="form-control" autoComplete="off" placeholder="single url per line" rows={7}/>

            <MDBLink className="text-center mt-4" onClick={submitted}>
              publish
            </MDBLink>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Build
