import React, { useState } from 'react'
import Switch from 'react-switch'
import { ThemeManager } from '../../utils/theme'
import { GrSun, GrMoon } from 'react-icons/gr'
import './index.scss'

const ThemeSwitch = () => {
  const [isCheck, setIsCheck] = useState(false)

  const handleChange = () => {
    setIsCheck((isCheck) => !isCheck)
    ThemeManager.onSwitch()
  }

  return (
    <div className="switch-container">
      <div className="switch">
        <Switch
          onChange={handleChange}
          checked={isCheck}
          height={24}
          width={49}
          onHandleColor={'#a5a6a7'}
          offHandleColor={'#a5a6a7'}
          checkedIcon={
            <i style={{ position: 'relative', top: '2.5px', left: '2.5px' }}>
              <GrMoon size={17} />
            </i>
          }
          uncheckedIcon={
            <i style={{ position: 'relative', top: '2.4px', left: '4px' }}>
              <GrSun size={17} />
            </i>
          }
          onColor={'#e3e3e3'}
          offColor={'#d9dfe9'}
        />
      </div>
    </div>
  )
}

export { ThemeSwitch }
