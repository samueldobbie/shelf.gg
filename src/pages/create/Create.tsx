import { CircularProgress, Container, TextField, Typography } from "@mui/material"
import { useState } from "@hookstate/core"
import Endpoint from "../../commons/Endpoint"
import FormAlert, { defaultFormAlert } from "../../components/form-alert/FormAlert"
import { LoadingButton } from "@mui/lab"
import { useForm } from "react-hook-form"

interface IShelfForm {
  name: string
  creator: string
  resources: string
}

function Create(): JSX.Element {
  const load = useState(false)
  const formAlert = useState(defaultFormAlert)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<IShelfForm>()

  const onSubmit = (data: IShelfForm) => {
    load.set(true)
    formAlert.set(defaultFormAlert)

    const title = document.getElementById("title") as HTMLInputElement
    const creator = document.getElementById("creator") as HTMLInputElement
    const resources = document.getElementById("resources") as HTMLInputElement

    fetch(Endpoint.Server.Shelf, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": title.value,
        "creator": creator.value,
        "resources": resources.value.split("\n"),
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          window.location.href = `/s/${data.message}`
        } else {
          formAlert.set({
            type: "error",
            message: data.message,
          })
        }
      })
      .finally(() => load.set(false))
  }

  return (
    <Container>
      {load.value &&
        <>
          <CircularProgress />

          <Typography variant="h6" gutterBottom>
            Building shelf...
          </Typography>
        </>
      }

      {!load.value &&
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            textAlign: "center",
            marginTop: "5%",
          }}
        >
          <FormAlert alert={formAlert} />

          <TextField
            variant="outlined"
            margin="normal"
            type="text"
            label="Shelf Name"
            value="Untitled"
            placeholder="e.g. Beginner Python Tutorials"
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
            sx={{ width: "80%" }}
            {...register("name", {
              required: "You must give the shelf a name",
            })}
          />
          <br />

          <TextField
            variant="outlined"
            margin="normal"
            type="text"
            label="Creator"
            placeholder="e.g. John Doe"
            value={"Anonymous"}
            error={!!errors.creator}
            helperText={errors.creator && errors.creator.message}
            sx={{ width: "80%" }}
            {...register("creator", {
              required: "You must specify the creator of the shelf",
            })}
          />
          <br />

          {/* Must be a complete URL (e.g. https://example.com instead of example.com) */}

          <TextField
            autoFocus
            multiline
            rows={15}
            variant="outlined"
            margin="normal"
            type="text"
            label="URLs (Max 50)"
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            error={!!errors.resources}
            helperText={errors.resources && errors.resources.message}
            sx={{ width: "80%" }}
            {...register("resources", {
              required: "You must specify at least one resource URL",
            })}
          />
          <br />

          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              marginBottom: 3,
              fontWeight: "bold",
            }}
          >
            Publish shelf
          </LoadingButton>
        </form>
      }
    </Container>
  )
}

export default Create
