const getDeadline = (): number => {
  return Math.round(new Date().getTime() / 1000) + 30
}

export default getDeadline