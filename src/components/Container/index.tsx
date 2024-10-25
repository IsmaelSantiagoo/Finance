import { ContainerProps } from "./types"

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`w-full rounded-xl bg-projectPallet-quaternary ${className}`}>
      {children}
    </div>
  )
}

export default Container