const getDate = (epoch: number): string => {
  const date = new Date(epoch)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export { getDate }
