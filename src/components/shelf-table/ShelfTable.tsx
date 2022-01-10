import { useState } from "@hookstate/core"
import { CircularProgress, Container, Typography } from "@mui/material"
import MUIDataTable, { Display } from "mui-datatables"
import { useEffect } from "react"
import { query, collection, getDocs } from "firebase/firestore"
import { db } from "../../commons/Firebase"
import { getDate } from "../../commons/Date"

const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: false,
      search: false,
      display: 'excluded' as Display,
    }
  },      
  {
    name: "created",
    label: "Created",
    options: {
      filter: false,
      search: false,
    }
  },
  {
    name: "title",
    label: "Title",
    options: {
      filter: true,
      search: true,
    }
  },
  {
    name: "# Resources",
    label: "# Resources",
    options: {
      filter: false,
      search: false,
    }
  },
  {
    name: "# Views",
    Label: "# Views",
    options: {
      filter: false,
    }
  },
]

interface Props {
  title: string
}

function ShelfTable(props: Props): JSX.Element {
  const { title } = props
 
  const load = useState(false)
  const shelves = useState([] as string[][])

  const handleRowClick = (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
    console.log(rowData)
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
          columns={columns}
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
          }}
        />
      }
    </Container>
  )
}

export default ShelfTable