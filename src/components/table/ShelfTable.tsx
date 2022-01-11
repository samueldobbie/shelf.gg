import { useState } from "@hookstate/core"
import { CircularProgress, Container, Typography } from "@mui/material"
import MUIDataTable, { MUISortOptions } from "mui-datatables"
import { useEffect } from "react"
import { query, collection, getDocs } from "firebase/firestore"
import { getDate } from "commons/utils/Date"
import { db } from "commons/utils/Firebase"
import { shelfTableColumns } from "./ShelfTableColumns"

interface IProps {
  title: string
  sortOrder: MUISortOptions,
}

function ShelfTable(props: IProps): JSX.Element {
  const { title, sortOrder } = props
 
  const load = useState(false)
  const shelves = useState([] as string[][])

  const handleRowClick = (rowData: string[]) => {
    redirectToShelf(rowData[0])
  }

  const redirectToShelf = (shelfId: string) => {
    window.open(`${window.location.origin}/s/${shelfId}`)
  }

  useEffect(() => {
    load.set(true)

    const retrievedShelves = [] as string[][]
    const shelvesQuery = query(collection(db, "shelves"))

    getDocs(shelvesQuery)
      .then((docs) => {
        docs.forEach((doc) => {
          const data = doc.data()

          retrievedShelves.push([
            doc.id,
            getDate(data.created),
            data.title,
            data.urls.length,
            data.views,
          ])
        })
      })
      .then(() => shelves.set(retrievedShelves))
      .finally(() => load.set(false))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {load.value &&
        <div
          style={{
            textAlign: "center",
            marginTop: "15%",
          }}
        >
          <CircularProgress />
          
          <Typography>
            Loading shelves...
          </Typography>
        </div>
      }

      {!load.value &&
        <MUIDataTable
          title={title}
          data={shelves.value}
          columns={shelfTableColumns}
          options={{
            onRowClick: handleRowClick,
            draggableColumns: {
              enabled: true,
            },
            jumpToPage: true,
            selectableRows: "none",
            download: false,
            print: false,
            elevation: 0,
            sortOrder,
          }}
        />
      }
    </Container>
  )
}

export default ShelfTable
