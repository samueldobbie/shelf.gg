import { State } from "@hookstate/core"
import { Alert, AlertColor, Box } from "@mui/material"

interface IAlert {
  type: AlertColor,
  message: string,
}

interface Props {
  alert: State<IAlert>
}

const defaultFormAlert = {} as IAlert

function FormAlert(props: Props): JSX.Element {
  const { alert } = props
  const { type, message } = alert.value

  return (
    <>
      {type && message && (
        <Box mb={4}>
          <Alert severity={type}>
            {message}
          </Alert>
        </Box>
      )}
    </>
  )
}

export default FormAlert

export { defaultFormAlert }
