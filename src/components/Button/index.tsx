import { ButtonTypes } from "./types"

const Button = ({ children, className, handleClick }: ButtonTypes) => {

  return (
		<div className={`${className} cursor-pointer border flex items-center text-sm px-3`} onClick={handleClick}>
			{ children }
		</div>
	)
}

export default Button