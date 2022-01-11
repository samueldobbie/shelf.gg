import { Container } from "@mui/material"
import ShelfTable from "components/table/ShelfTable"

function Explore(): JSX.Element {
  return (
    <Container
      sx={{
        marginTop: "5%",
        marginBottom: "5%",
      }}
    >
      <ShelfTable title="Public Shelves" />
    </Container>
  )
}

export default Explore
