import { Container } from "@mui/material"
import ShelfTable from "../../components/shelf-table/ShelfTable"

function Explore(): JSX.Element {
  return (
    <Container
      sx={{
        marginTop: "5%",
        marginBottom: "5%",
      }}
    >
      <ShelfTable/>
    </Container>
  )
}

export default Explore
