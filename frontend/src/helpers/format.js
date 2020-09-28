export const formatMoney = (number, currency = 'VND') => {
  return new Intl.NumberFormat('vie', {
    style: 'currency',
    currency,
    maximumSignificantDigits: 3,
  }).format(number)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('vie').format(new Date(date))
}
