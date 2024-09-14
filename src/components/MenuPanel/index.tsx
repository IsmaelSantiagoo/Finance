import { useState } from "react"
import Menu from "./Menu"
import { MenuPanelProps } from "./types"

const MenuPanel = ({items, defaultActiveIndex = 0, menuDivider = -1}: MenuPanelProps) => {

  const [activeMenu, setActiveMenu] = useState<number | null>(defaultActiveIndex)

  const activateMenu = (index: number, action: () => void) => {

    setActiveMenu(index)
    
    if (activeMenu !== null) action()
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        {
          items.map(({icon, text, control, handleClick = () => {}}, index) => (
            <>
                <Menu
                key={index}
                icon={icon}
                text={text}
                isActive={index === activeMenu}
                control={control}
                handleClick={() => {activateMenu(index, handleClick)}}
              />
              {
                index === menuDivider-1 ? <hr/> : ''
              }
            </>
          ))
        }
      </div>
    </div>
  )
}

export default MenuPanel