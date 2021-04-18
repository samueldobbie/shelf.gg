import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { useEffect } from 'react'

import Title from '@shelf/helpers/Title'
import Table from './Table/Table'
import './Explore.css'


function Explore(): JSX.Element {
  useEffect(() => {
    document.title = Title.Explore
  })

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <div className="table-container">
            <Table/>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Explore
