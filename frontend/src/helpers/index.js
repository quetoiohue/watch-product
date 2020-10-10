import { CALL, EMAIL, SMS } from '../constants'

export const getAlert = (productAlert) => {
  switch (productAlert.alert_type_id) {
    case EMAIL:
      return 'Email'
    case SMS:
      return 'Sms'
    case CALL:
      return 'Call'
    default:
      return ''
  }
}

export const getAlertValue = (alerts, alertId) => {
  const alertItem = alerts?.find((_alert) => _alert.alert_type_id === alertId)

  if (!alertItem) {
    return false
  }

  return !!alertItem.status
}

export const checkExistingProduct = (products, link) => {
  return products.some((_p) => _p.link === link)
}

export function createMarkup(htmlInput) {
  return { __html: htmlInput }
}

export function getNoReadNotification(notifications) {
  return notifications?.filter((_n) => !_n.status).length
}
