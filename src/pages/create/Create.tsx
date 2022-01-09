import { Container, Link, Tooltip } from "@mui/material"
import { useState } from "react"
import Endpoint from "../../commons/Endpoint"

function Create(): JSX.Element {
  const [load, setLoad] = useState(false)
  const [error, setError] = useState("")

  const submitted = async () => {
    setLoad(true)
    setError("")

    const title = document.getElementById("title") as HTMLInputElement
    const creator = document.getElementById("creator") as HTMLInputElement
    const resources = document.getElementById("resources") as HTMLInputElement

    fetch(Endpoint.Server.Shelf, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": title.value,
        "creator": creator.value,
        "resources": resources.value.split("\n"),
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          window.location.href = "/s/" + data.message
        } else {
          setError(data.message)
        }
      })
      .finally(() => setLoad(false))
  }

  return (
    <Container className="build-container">
      {/* {error &&
        <MDBAlert color="danger" >
          {error}
        </MDBAlert>
      } */}
      
      {load &&
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
          <p className="spinner-text">building shelf...</p>
        </div>
      }

      {!load &&
        <form>
          <label htmlFor="title" className="grey-text">
            title
          </label>
          <input type="text" id="title" className="form-control" defaultValue="untitled" autoComplete="off" maxLength={100}/>
          <br/>

          <label htmlFor="creator" className="grey-text">
            creator
          </label>
          <input type="text" id="creator" className="form-control" defaultValue="anonymous" autoComplete="off"  maxLength={30}/>
          <br/>

          <label htmlFor="resources" className="grey-text">
            resource list (max 50)
            <Tooltip placement="top" title="Must be a complete URL (e.g. https://example.com instead of example.com)">
              <span className="tool-tip-custom">
                {/* <MDBIcon icon="info-circle" /> */}
              </span>
            </Tooltip>
          </label>
          <textarea id="resources" className="form-control" autoComplete="off" placeholder="single url per line" rows={7}/>

          <Link className="text-center mt-4" onClick={submitted}>
            publish
          </Link>
        </form>
      }
    </Container>
  )
}

export default Create
