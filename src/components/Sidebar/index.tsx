import { SidebarProps } from "./types"

const Sidebar = ({children, className}: SidebarProps) => {
  return (
    <div className={`min-w-[300px] h-screen ${className}`}>
      {children}
    </div>
  )
}

export default Sidebar