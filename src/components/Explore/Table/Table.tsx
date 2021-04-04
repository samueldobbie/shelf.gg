import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import { useEffect, useState } from 'react'

import './Table.css'

function Table(props: any): JSX.Element {
  const [items, setItems] = useState([])

  useEffect(() => {
    const url = 'http://localhost:5000/api/v1/shelf/all/' + props.listType
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          const shelves = JSON.parse(data.message)

          console.log(shelves)
          
          setItems(shelves)
        }
      })
  }, [props.listType])

  return (
    <MDBTable hover className="table-custom">
      <MDBTableHead>
        <tr>
          <th>created</th>
          <th>title</th>
          <th>item count</th>
          <th>view count</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {items.map((value) => {
          return (
            <tr>
              <td>{ value['createdDate'] }</td>
              <td>{ value['title'] }</td>
              <td>{ value['itemCount'] }</td>
              <td>{ value['views'] }</td>
            </tr>
          )
        })}
      </MDBTableBody>
    </MDBTable>
  )
}

export default Table
