import { ContainerProps } from "./types"

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`w-full rounded-xl bg-projectPalletLight-secondary dark:bg-projectPallet-quaternary ${className}`}>
      {children}
    </div>
  )
}

export default Container