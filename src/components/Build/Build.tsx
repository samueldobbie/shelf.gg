import { MDBContainer, MDBRow, MDBCol, MDBLink, MDBAlert } from 'mdbreact'
import { useEffect, useState } from 'react'

import Title from '@shelf/helpers/Title'
import './Build.css'

function Build(): JSX.Element {
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = Title.Build
  })

  const submitted = async () => {
    const url = 'http://localhost:5000/api/v1/shelf'
    const title = document.getElementById('title') as HTMLInputElement
    const creator = document.getElementById('creator') as HTMLInputElement
    const resources = document.getElementById('resources') as HTMLInputElement
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'title': title.value,
        'creator': creator.value,
        'resources': resources.value.split('\n'),
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          window.location.href = '/s/' + data.message
        } else {
          setError(data.message)
        }
      })
  }

  return (
    <MDBContainer>
      {error &&
        <MDBAlert color="danger" >
          {error}
        </MDBAlert>
      }
      
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
