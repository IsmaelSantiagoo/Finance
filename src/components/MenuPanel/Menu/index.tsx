import Link from "next/link"
import { MenuItem } from "../types"

const Menu = ({icon, text, control, isActive = false, link = ''}: MenuItem) => {

  return (
    <Link href={link}>
      <div className={`rounded-xl ${isActive && !control?'bg-projectPallet-secondary':''} flex p-4 items-center justify-between text-2xl cursor-pointer`}>
        <div className="flex gap-4 items-center">
          {icon}
          <p className="font-bold text-sm">{text}</p>
        </div>
        {
          control ? 
          <div className="h-full flex justify-end ">
            {control}
          </div>
          : <></>
        }
      </div>
    </Link>
  )
}

export default Menu