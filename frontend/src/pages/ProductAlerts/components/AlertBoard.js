import { Switch } from '@material-ui/core'
import React from 'react'

const AlertBoard = ({ alerts, onChangeAlertStatus }) => {
  return (
    <section className="alert__board">
      <div className="alert__item flex items-center justify-between leading-5">
        <div className="alert__item--info">
          <p className="font-medium">
            <span>Email alert</span>
            <span className="text-primary"> 1 point</span>
          </p>
          <p className="alert__item--subtitle fs-14">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <Switch
          checked={alerts.email}
          onChange={onChangeAlertStatus}
          color="primary"
          name="email"
        />
      </div>
      <div className="alert__item flex items-center justify-between leading-5">
        <div className="alert__item--info">
          <p className="font-medium">
            <span>Sms alert</span>
            <span className="text-primary"> 1 point</span>
          </p>
          <p className="alert__item--subtitle fs-14">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <Switch
          checked={alerts.sms}
          onChange={onChangeAlertStatus}
          color="primary"
          name="sms"
        />
      </div>
    </section>
  )
}

export default AlertBoard
