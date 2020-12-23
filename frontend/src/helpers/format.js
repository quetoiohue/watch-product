import moment from 'moment'

export const formatMoney = (number, currency = 'VND') => {
  return new Intl.NumberFormat('vie', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
    .format(Number(number)?.toFixed(0))
    .replace(new RegExp('[.]', 'g'), ',')
}

export const formatDate = date => {
  return moment(date).format('DD MMM YYYY')
}

export const formatMonth = date => {
  const newDate = new Date(date)
  return `${newDate.getMonth() + 1}.${newDate.getFullYear()}`
}

export const formatDateTime = date => {
  return moment(date).format('DD MMM YYYY HH:MM:ss')
}
