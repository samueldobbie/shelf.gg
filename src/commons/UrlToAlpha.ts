const urlToAlphanumeric = (url: string): string => {
  return url.replace(/[^a-zA-Z0-9]/g, "")
}

export { urlToAlphanumeric }
