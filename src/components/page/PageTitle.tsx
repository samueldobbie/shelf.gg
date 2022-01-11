import { Helmet } from "react-helmet"

interface IProps {
  text: string
}

function PageTitle(props: IProps): JSX.Element {
  const { text } = props

  return (
    <Helmet>
      <title>
        {text} - shelf.gg
      </title>
    </Helmet>
  )
}

export default PageTitle
