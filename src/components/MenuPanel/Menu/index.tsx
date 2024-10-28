import Link from "next/link"
import { MenuItem } from "../types"

const Menu = ({icon, text, control, isActive, link}: MenuItem) => {

  return (
    link ? <Link href={link}>
      <div className={`rounded-xl ${isActive && !control?'bg-projectPalletLight-secondary dark:bg-projectPallet-secondary text-projectPallet-secondary dark:text-projectPalletLight-secondary':''} flex ${control ? 'py-3 pl-3' : 'p-3'} items-center justify-between text-2xl cursor-pointer`}>
        <div className="flex gap-4 items-center">
          {icon}
          <p className="font-bold text-sm">{text}</p>
        </div>
        { 
          control && <div className="flex justify-end">
            {control}
          </div>
        }
      </div>
    </Link> : 
    <div className={`rounded-xl ${isActive && !control?'bg-projectPalletLight-secondary dark:bg-projectPallet-secondary text-projectPallet-secondary dark:text-projectPalletLight-secondary':''} flex ${control ? 'py-3 pl-3' : 'p-3'} items-center justify-between text-2xl cursor-pointer`}>
      <div className="flex gap-4 items-center">
        {icon}
        <p className="font-bold text-sm">{text}</p>
      </div>
      { 
        control && <div className="flex justify-end">
          {control}
        </div>
      }
    </div>
  )
}

export default Menu