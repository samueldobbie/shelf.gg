import { MDBDataTable } from 'mdbreact'
import { useEffect, useState } from 'react'

import Config from '@shelf/helpers/Config'
import './Table.css'

function Table(): JSX.Element {
  const [load, setLoad] = useState(false)
  const [count, setCount] = useState(0);
  const [shelves, setShelves] = useState({
    columns: columns,
    rows: [],
  })

  useEffect(() => {
    if (count > 0) return;

    setCount(1)
    setLoad(true)

    const url = `${Config.BaseApiUrl}/api/v1/shelf/all`
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          const rows = JSON.parse(data.message)

          for (let i = 0; i < rows.length; i++) {
            const created = rows[i]["created"]
            const id = rows[i]["_id"]

            rows[i]["created"] = getDate(created)
            rows[i]["clickEvent"] = () => redirectToShelf(id)
          }

          setShelves({
            columns: columns,
            rows: rows,
          })
        }
      })
      .finally(() => setLoad(false))
  }, [count])

  return (
    <>
      {load === false &&
        <MDBDataTable
          data={shelves}
          hover
        />
      }

      {load === true &&
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
          <p className="spinner-text">loading shelves...</p>
        </div>
      }
    </>
  )
}


const columns = [
  {
    label: 'created',
    field: 'created',
    width: 100,
  },
  {
    label: 'title',
    field: 'title',
    width: 300,
  },
  {
    label: '# resources',
    field: 'resources_size',
    width: 100,
  },
  {
    label: '# views',
    field: 'views',
    width: 100,
    sort: 'desc',
  },
]

function redirectToShelf(shelfId: string): void {
  window.open(`${window.location.origin}/s/${shelfId}`)
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
