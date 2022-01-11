import { Display } from "mui-datatables"

const shelfTableColumns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: false,
      search: false,
      display: 'excluded' as Display,
    }
  },
  {
    name: "created",
    label: "Created",
    options: {
      filter: false,
      search: false,
    }
  },
  {
    name: "title",
    label: "Title",
    options: {
      filter: true,
      search: true,
    }
  },
  {
    name: "# Resources",
    label: "# Resources",
    options: {
      filter: false,
      search: false,
    }
  },
  {
    name: "# Views",
    Label: "# Views",
    options: {
      filter: false,
    }
  },
]

export { shelfTableColumns }
