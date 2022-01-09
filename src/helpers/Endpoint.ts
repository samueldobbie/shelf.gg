const Client = {
  Any: "*",
  Home: "/",
  Faq: "/faq",
  Build: "/build",
  Shelf: "/s/*",
  Explore: "/explore",
  PageNotFound: "/404",
}

const External = {
  Repo: "https://github.com/samueldobbie/shelf.gg",
}

const backendUrl = "https://api.0djtjjj76i2ko.eu-west-2.cs.amazonlightsail.com"

const Server = {
  Shelf: backendUrl + "/api/v1/shelf",
}

const Endpoint = {
  Client,
  External,
  Server,
}

export default Endpoint
