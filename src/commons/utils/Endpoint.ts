const Client = {
  Any: "*",
  Home: "/",
  Faq: "/faq",
  Build: "/build",
  Explore: "/explore",
  Shelf: "/s/:shelfId*",
  NotFound: "/404",
}

const External = {
  GitHubRepo: "https://github.com/samueldobbie/shelf.gg",
}

const apiUrl = "https://z0tj2bngbd.execute-api.us-west-2.amazonaws.com/production"
const Server = {
  ExtractMetaData: apiUrl + "/public/v1/extract-meta",
}

const Endpoint = {
  Client,
  External,
  Server,
}

export default Endpoint
