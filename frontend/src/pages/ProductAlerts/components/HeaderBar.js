import React from 'react'
import { useSelector } from 'react-redux'

const HeaderBar = () => {
  const { user } = useSelector((state) => state.user) || {}
  const { total_point } = user || {}

  return (
    <div className="header__bar flex justify-between items-center">
      <span className="title">Types of alerts</span>
      <div className="user__point">
        Available points:{' '}
        <span className="text-primary font-medium"> {total_point} </span>
      </div>
    </div>
  )
}

export default HeaderBar
