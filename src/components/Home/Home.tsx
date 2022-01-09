import { useEffect } from "react"
import { MDBCardBody, MDBCardText, MDBCardTitle, MDBJumbotron, MDBLink } from "mdbreact"

import Endpoint from "@shelf/helpers/Endpoint"
import Title from "@shelf/helpers/Title"

import "./Home.css"

function Home(): JSX.Element {
  useEffect(() => {
    document.title = Title.Home
  }, [])

  return (
    <MDBJumbotron className="text-center">
      <MDBCardBody>
        <MDBCardTitle className="h1">
          shelf.gg
        </MDBCardTitle>
        <br/>

        <MDBCardText>
          create, share, and find resources
        </MDBCardText>
        <br/>

        <div className="pt-2">
          <MDBLink to={Endpoint.Client.Build} className="landing-btn secondary">
            build
          </MDBLink>

          <MDBLink to={Endpoint.Client.Explore} className="landing-btn">
            explore
          </MDBLink>
        </div>
      </MDBCardBody>
    </MDBJumbotron>
  )
}

export default Home
