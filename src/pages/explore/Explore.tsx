import { Container } from "@mui/material"
import Table from "../../components/table/Table"

function Explore(): JSX.Element {
  return (
    <Container
      sx={{
        marginTop: "5%",
        marginBottom: "5%",
      }}
    >
      <Table/>
    </Container>
  )
}

export default Explore
