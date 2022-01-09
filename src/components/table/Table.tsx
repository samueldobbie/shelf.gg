import { useState } from "@hookstate/core"
import { CircularProgress, Typography } from "@mui/material"
import MUIDataTable from "mui-datatables"
import { useEffect } from "react"

const columns = [
  "Created",
  "Title",
  "# Resources",
  "# Views",
]

function Table(): JSX.Element {
  const load = useState(false)
  const shelves = useState([] as string[][])

  useEffect(() => {
    shelves.set([
      ["2020-01-01", "My first shelf", "1", "1"],
      ["2020-01-01", "My first shelf", "1", "1"],
      ["2020-01-01", "My first shelf", "1", "1"],
    ])
  }, [])

  // useEffect(() => {
  //   setLoad(true)

  //   const url = `${Endpoint.Server.Shelf}/all`

  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.statusCode === 200) {
  //         const rows = JSON.parse(data.message)

  //         for (let i = 0; i < rows.length; i++) {
  //           const created = rows[i]["created"]
  //           const id = rows[i]["_id"]

  //           rows[i]["created"] = getDate(created)
  //           rows[i]["clickEvent"] = () => redirectToShelf(id)
  //         }

  //         setShelves({
  //           columns: columns,
  //           rows: rows,
  //         })
  //       }
  //     })
  //     .finally(() => setLoad(false))
  // }, [])

  return (
    <>
      {load.value &&
        <>
          <CircularProgress />
          
          <Typography>
            Loading shelves...
          </Typography>
        </>
      }

      {!load.value &&
        <MUIDataTable
          title="All Shelves"
          data={shelves.value}
          columns={columns}
        />
      }
    </>
  )
}

function redirectToShelf(shelfId: string): void {
  window.open(`${window.location.origin}/s/${shelfId}`)
}

function getDate(epoch: number): string {
  const date = new Date(0)
  date.setUTCSeconds(epoch)

  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date)
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date)
  const year = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(date)

  return `${day}-${month}-${year}`.toLowerCase()
}

export default Table
