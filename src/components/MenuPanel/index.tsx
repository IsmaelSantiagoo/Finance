import Menu from "./Menu"
import { MenuPanelProps } from "./types"

const MenuPanel = ({items, defaultActiveIndex, menuDivider = -1}: MenuPanelProps) => {

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        {
          items.map(({icon, text, control, link}, index) => (

            <div key={index}>
              <Menu
                icon={icon}
                text={text}
                isActive={ index === defaultActiveIndex }
                control={control}
                link={link}
              />
              {
                index === menuDivider-1 && <hr/>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MenuPanel