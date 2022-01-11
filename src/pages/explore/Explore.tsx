import { Container } from "@mui/material"
import ShelfTable from "components/table/ShelfTable"
import { MUISortOptions } from "mui-datatables"

function Explore(): JSX.Element {
  return (
    <Container
      sx={{
        marginTop: "5%",
        marginBottom: "5%",
      }}
    >
      <ShelfTable
        title="Public Shelves"
        sortOrder={{} as MUISortOptions}
      />
    </Container>
  )
}

export default Explore
