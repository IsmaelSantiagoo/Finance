import { HeaderProps } from "./types"

const Header = ({children}: HeaderProps) => {
  return (
    <div className="w-full h-20 border">
      {children}
    </div>
  )
}

export default Header