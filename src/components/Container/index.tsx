import { ContainerProps } from "./types"

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`bg-projectPallet-quaternary p-5 w-full rounded-xl ${className}`}>
      {children}
    </div>
  )
}

export default Container