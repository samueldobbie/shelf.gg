interface IProps {
  title: string
  creator: string
  views: number
}

function ShelfTitle(props: IProps): JSX.Element {
  const { title, creator, views } = props

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "5%",
      }}
    >
      <h1>{ title }</h1>
      <h4>Created by { creator }</h4>
      <h4>{ views } views</h4>
    </div>
  )
}

export default ShelfTitle
