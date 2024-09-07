import { SidebarProps } from "./types"

const Sidebar = ({children, className}: SidebarProps) => {
  return (
    <div className={`w-[400px] h-screen ${className}`}>
      {children}
    </div>
  )
}

export default Sidebar