import React from 'react'
import Switch from 'react-switch'
import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '../../hooks'
import './index.scss'

const ThemeSwitch = () => {
  const [themeFlag, toggleTheme] = useTheme()

  return (
    <div className="switch-container">
      <div className="switch">
        <Switch
          onChange={toggleTheme}
          checked={themeFlag}
          height={24}
          width={49}
          onHandleColor={'#a5a6a7'}
          offHandleColor={'#a5a6a7'}
          checkedIcon={
            <i style={{ position: 'relative', top: '1.5px', left: '4px' }}>
              <HiMoon size={17} />
            </i>
          }
          uncheckedIcon={
            <i style={{ position: 'relative', top: '1.45px', left: '4px' }}>
              <HiSun size={17} />
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
