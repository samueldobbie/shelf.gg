import { Container, TextField } from "@mui/material"
import { useState } from "@hookstate/core"
import FormAlert, { defaultFormAlert } from "../../components/form-alert/FormAlert"
import { LoadingButton } from "@mui/lab"
import { useForm } from "react-hook-form"
import { db } from "../../commons/Firebase"
import { addDoc, collection } from "firebase/firestore"

interface ICreateForm {
  title: string
  creator: string
  resources: string
}

function Create(): JSX.Element {
  const formAlert = useState(defaultFormAlert)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ICreateForm>()

  const onSubmit = (data: ICreateForm) => {
    formAlert.set(defaultFormAlert)

    let { title, creator, resources } = data

    if (title.length === 0) {
      title = "Untitled"
    }

    if (creator.length === 0) {
      creator = "Anonymous"
    }

    const urls = resources
      .split("\n")
      .map((r) => r.trim())
      .filter((url) => {
        try {
          new URL(url)
          return true
        } catch (e) {
          return false
        }
      })

    addDoc(collection(db, "shelves"), {
      title,
      creator,
      urls,
    })
      .then((doc) => window.location.href = `/s/${doc.id}`)
      .catch((error) => formAlert.set({
        type: "error",
        message: error.message,
      }))
  }

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          textAlign: "center",
          marginTop: "5%",
        }}
      >
        <FormAlert alert={formAlert} />

        <TextField
          autoFocus
          variant="outlined"
          margin="normal"
          type="text"
          label="Title (Default: Untitled)"
          placeholder="e.g. Beginner Python Tutorials"
          error={!!errors.title}
          helperText={errors.title && errors.title.message}
          sx={{ width: "80%" }}
          {...register("title")}
        />
        <br />

        <TextField
          variant="outlined"
          margin="normal"
          type="text"
          label="Creator (Default: Anonymous)"
          placeholder="e.g. John Doe"
          error={!!errors.creator}
          helperText={errors.creator && errors.creator.message}
          sx={{ width: "80%" }}
          {...register("creator")}
        />
        <br />

        <TextField
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
    </Container>
  )
}

export default Create
