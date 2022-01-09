class Title {
  static Postfix = " - shelf.gg"
  static Home = buildTitle("home")
  static Faq = buildTitle("faq")
  static Build = buildTitle("build")
  static Shelf = buildTitle("shelf")
  static Explore = buildTitle("explore")
  static PageNotFound = buildTitle("404")
}

export function buildTitle(prefix: string): string {
  return prefix + Title.Postfix
}

export default Title
