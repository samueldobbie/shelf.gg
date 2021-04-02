import {
  MDBCardBody,
  MDBCardText,
  MDBCardTitle, MDBJumbotron, MDBLink
} from 'mdbreact'
import GitHubButton from 'react-github-btn'

import Endpoint from '@shelf/helpers/Endpoint'
import './Home.css'

function Home() {
  return (    
    <MDBJumbotron className="text-center">
      <MDBCardBody>
        <MDBCardTitle className="h1">
          shelf.gg
        </MDBCardTitle>
        <br/>
        <MDBCardText>
          find and share useful resources
        </MDBCardText>
        <br/>
        <div className="pt-2">
          <MDBLink to={Endpoint.Build} className="landing-btn">
            build
          </MDBLink>
          <MDBLink to={Endpoint.Explore} className="landing-btn">
            explore
          </MDBLink>
        </div>
        <br/>
        <GitHubButton
          href="https://github.com/samueldobbie/shelf.gg"
          data-size="large"
          data-show-count="true"
          aria-label="Star samueldobbie/shelf.gg on GitHub"
        >
          Star
        </GitHubButton>
      </MDBCardBody>
    </MDBJumbotron>
  )
}

export default Home
