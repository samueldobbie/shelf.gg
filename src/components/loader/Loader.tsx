import { CircularProgress, Typography } from "@mui/material"

interface IProps {
  message: string
}

function Loader(props: IProps): JSX.Element {
  const { message } = props

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "15%",
      }}
    >
      <CircularProgress />
      
      <Typography>
        {message}
      </Typography>
    </div>
  )
}

export default Loader
