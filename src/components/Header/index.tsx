import { HeaderProps } from "./types"

const Header = ({children, className}: HeaderProps) => {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  )
}

export default Header