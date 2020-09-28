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
