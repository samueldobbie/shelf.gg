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
          setItems(shelves)
        }
      })
  }, [props.listType])

  function redirectToShelf(shelfId: string): void {
    window.location.href = '/s/' + shelfId
  }

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
          const date = getDate(value['created'])

          return (
            <tr className="table-row-custom" onClick={() => redirectToShelf(value['_id'])}>
              <td>{ date }</td>
              <td>{ value['title'] }</td>
              <td>{ value['views'] }</td>
              <td>{ value['views'] }</td>
            </tr>
          )
        })}
      </MDBTableBody>
    </MDBTable>
  )
}

function getDate(epoch: number): string {
  const date = new Date(0)
  date.setUTCSeconds(epoch)

  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
  const year = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(date)

  return `${day}-${month}-${year}`.toLowerCase()
}

export default Table
