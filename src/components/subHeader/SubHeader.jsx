import React from 'react'
import './SubHeader.css'
export default function SubHeader({pname}) {
  return (
  <div className="SubHeader">
    <div className="container">
        <div className="content">
            <h2>{pname}</h2>
        </div>
    </div>
  </div>
  )
}
