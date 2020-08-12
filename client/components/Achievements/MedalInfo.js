import React from 'react'
import { capitalize } from 'Utilities/common'
import Medal from './Medal'

const MedalInfo = ({ amount, medal }) => (
  <div className="medal-info">
    <Medal medal={medal} />
    <div className="flex-column padding-left-1">
      <span className="medal-amount">{amount}</span>
      <span className="medal-name">{capitalize(medal)}</span>
    </div>
  </div>
)

export default MedalInfo