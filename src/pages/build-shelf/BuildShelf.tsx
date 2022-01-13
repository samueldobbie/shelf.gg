import { Container, TextField } from "@mui/material"
import { useState } from "@hookstate/core"
import { LoadingButton } from "@mui/lab"
import { useForm } from "react-hook-form"
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import Endpoint from "commons/utils/Endpoint"
import { db } from "commons/utils/Firebase"
import { urlToAlphanumeric } from "commons/utils/UrlToAlpha"
import FormAlert, { defaultFormAlert } from "components/form/FormAlert"

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

  const onSubmit = async (data: ICreateForm) => {
    formAlert.set(defaultFormAlert)

    const createdAt = Date.now()
    const title = data.title.substring(0, 50) || "Untitled"
    const creator = data.creator.substring(0, 50) || "Anonymous"
    const urls = getFilteredUrls(data.resources)
    const views = 0

    if (urls.length === 0) {
      formAlert.set({
        type: "error",
        message: "No valid URLs found",
      })

      return
    }

    const unseenUrls = await getUnseenUrls(urls)

    // TODO use urlMetadata package
    await fetch(Endpoint.Server.ExtractMetaData, {
      method: "POST",
      body: JSON.stringify({ urls: unseenUrls }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        const resources = data["result"]

        for (const resource of resources) {
          const urlId = urlToAlphanumeric(resource.url)
          const docRef = doc(db, "resources", urlId)
          await setDoc(docRef, resource);
        }
      })

    await addDoc(collection(db, "shelves"), {
      createdAt,
      title,
      creator,
      urls,
      views,
    })
      .then((doc) => window.location.href = `/s/${doc.id}`)
      .catch((error) => formAlert.set({
        type: "error",
        message: error.message,
      }))
  }

  const getFilteredUrls = (resources: string): string[] => {
    return resources
      .split("\n")
      .map((url) => url.trim())
      .filter((url, index, self) => self.indexOf(url) === index)
      .filter((url) => isValidUrl(url))
  }

  const isValidUrl = (url: string): boolean => {
    return url.match(/^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm) !== null
  }

  const getUnseenUrls = async (urls: string[]): Promise<string[]> => {
    const unseenUrls = [] as string[]

    for (const url of urls) {
      const docRef = doc(db, "resources", urlToAlphanumeric(url))
      
      await getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
          } else {
            unseenUrls.push(url)
          }
        })
        .catch((e) => console.log(e))
    }

    return unseenUrls
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
          Build shelf
        </LoadingButton>
      </form>
    </Container>
  )
}

export default Create
