const formattedDate = (days) => {
  const today = new Date()
  const yesterday = new Date(today).setDate(today.getDate() - days)

  const year = new Date(yesterday).getFullYear()
  const month = new Date(yesterday).getMonth() + 1
  const day = new Date(yesterday).getDate()
  const formatDate = date => date.toString().length < 2 ? `0${date}` : date

  return ({
    year,
    month: formatDate(month),
    day: formatDate(day)
  })
}

export const week = () => {
  let weekArr = []
  for (let i = 1; i < 8; i++) {
    weekArr.push(formattedDate(i))
  }
  return weekArr
}
