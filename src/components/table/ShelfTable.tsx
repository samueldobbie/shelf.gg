import { useState } from "@hookstate/core"
import { Container } from "@mui/material"
import MUIDataTable, { MUISortOptions } from "mui-datatables"
import { useEffect } from "react"
import { query, collection, getDocs } from "firebase/firestore"
import { getDate } from "commons/utils/Date"
import { db } from "commons/utils/Firebase"
import { shelfTableColumns } from "./ShelfTableColumns"
import Loader from "components/loader/Loader"
import "./ShelfTable.css"

interface IProps {
  title: string
  sortOrder: MUISortOptions,
}

function ShelfTable(props: IProps): JSX.Element {
  const { title, sortOrder } = props
 
  const load = useState(false)
  const shelves = useState([] as string[][])

  const handleRowClick = (rowData: string[]): void => {
    const shelfId = rowData[0]
    window.open(`${window.location.origin}/s/${shelfId}`)
  }

  const isValidShelf = (data: any): Boolean => {
    return (
      data.title &&
      data.creator && 
      data.urls &&
      data.views &&
      data.createdAt
    )
  }

  useEffect(() => {
    load.set(true)

    const retrievedShelves = [] as string[][]
    const shelvesQuery = query(collection(db, "shelves"))

    getDocs(shelvesQuery)
      .then((docs) => {
        docs.forEach((doc) => {
          const data = doc.data()

          if (isValidShelf(data)) {
            const shelfId = doc.id
            const date = getDate(data.createdAt)
            const resourceCount = data.urls.length

            retrievedShelves.push([
              shelfId,
              date,
              data.title,
              resourceCount,
              data.views,
            ])
          }
        })
      })
      .then(() => shelves.set(retrievedShelves))
      .finally(() => load.set(false))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {load.value &&
        <Loader message="Loading shelves..." />
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
