import { Helmet } from "react-helmet"

interface Props {
  text: string
}

function PageTitle(props: Props): JSX.Element {
  const { text } = props

  return (
    <Helmet>
      <title>
        {text} - CousCous
      </title>
    </Helmet>
  )
}

export default PageTitle
