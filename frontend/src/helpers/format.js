export const formatMoney = (number, currency = 'VND') => {
  return new Intl.NumberFormat('vie', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(number?.toFixed(0))
    .replace(new RegExp('[.]', 'g'), ',')
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US').format(new Date(date))
}

export const formatMonth = (date) => {
  const newDate = new Date(date)
  return `${newDate.getMonth() + 1}.${newDate.getFullYear()}`
}

export const formatDateTime = (date) => {
  date = new Date(date)
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm
  return (
    date.getMonth() +
    1 +
    '/' +
    date.getDate() +
    '/' +
    date.getFullYear() +
    ' ' +
    strTime
  )
}
