import React, { useMemo } from 'react'
import { capitalize } from 'Utilities/common'
import Medal from './Medal'

const AchievementToast = ({ achievement }) => {
  const { name, level, current } = achievement

  const medal = useMemo(() => {
    switch (level) {
      case 1:
        return 'bronze'
      case 2:
        return 'silver'
      case 3:
        return 'gold'
      case 4:
        return 'emerald'
      case 5:
        return 'diamond'
      default:
        return 'unlocked'
    }
  }, [level])

  return (
    <div className="flex">
      <Medal medal={medal} />
      <div className="flex-column padding-left-2">
        <span style={{ fontSize: '11px', fontWeight: 550 }}>{capitalize(medal)} medal earned</span>
        <div>
          <b>
            <span style={{ fontSize: '16px' }}>{Math.floor(current)}</span>
            {'  '}
            <span>{name}</span>
          </b>
        </div>
      </div>
    </div>
  )
}

export default AchievementToast
