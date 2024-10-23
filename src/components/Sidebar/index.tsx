import { SidebarProps } from "./types"

const Sidebar = ({children, className}: SidebarProps) => {
  return (
    <div className={`min-w-[250px] max-w-[250px] h-screen ${className}`}>
      {children}
    </div>
  )
}

export default Sidebar