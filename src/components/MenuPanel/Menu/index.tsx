import { MenuItem } from "../types"

const Menu = ({icon, text, control, isActive = false, handleClick}: MenuItem) => {

  return (
    <div  
      className={`rounded-xl ${isActive && !control?'bg-projectPallet-secondary':''} flex p-4 items-center justify-between text-2xl cursor-pointer`}
      onClick={handleClick}
    >
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
  )
}

export default Menu