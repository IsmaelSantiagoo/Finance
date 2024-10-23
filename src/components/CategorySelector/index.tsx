import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@mui/material"
import { decodeAction } from "next/dist/server/app-render/entry-base"
import { useEffect, useRef, useState } from "react"

const CategorySelector = ({ items, label, defaultValue, onChange }: CategorySelectorTypes) => {

	const [value, setValue] = useState<CategorySelectorItems>()
	const [active, setActive] = useState<boolean>(false)

	useEffect(() => {

		if (defaultValue) {
			setValue(defaultValue)
			onChange(defaultValue.id)
		}
	}, [items, defaultValue])

	useEffect(() => {

		if (value) onChange(value.id)
	}, [value])

	return (
		<div className="w-full flex flex-col gap-2">
			<label htmlFor={label} className="text-lg font-bold">{label}</label>
			<div className="w-full flex flex-col gap-2" id={label}>
				<div className="flex gap-2 w-full items-center justify-between bg-projectPallet-secondary hover:bg-projectPallet-tertiary cursor-pointer rounded-xl p-2" onClick={() => setActive(!active)}>
					<div className="flex gap-2 items-center">
						{
							value && <i className={`fa fa-${value.icon} p-3 text-md rounded-full w-10 h-10`} style={{ background: `${value.color}`}}></i>
						}
						<span className="text-md font-bold p-2">{value ? value.label : 'Escolha uma opção'}</span>
					</div>
					<FontAwesomeIcon icon={faCaretDown} size="xl"/>
				</div>

				<div className="w-screen h-screen flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-60 z-50" style={{ display: active ? 'flex' : 'none'}}>
					<div className="flex flex-col gap-2">
						<div className="w-[300px] max-h-[550px] overflow-auto p-2 bg-projectPallet-secondary rounded-xl flex flex-col gap-2 border-2 border-white">
							{
								items.map( ({ id, label, color, icon }) => (
									<div key={label} className="flex gap-2 w-full items-center hover:bg-projectPallet-tertiary cursor-pointer rounded-xl p-2" onClick={() => {setValue({ id: id, label: label, color: color, icon: icon});setActive(false)}}>
										{
											icon && <i className={`fa fa-${icon} p-3 text-md rounded-full`} style={{ background: `${color}`}}></i>
										}
										<span className="text-md font-bold">{label}</span>
									</div>
								))
							}
						</div>
						<Button className="bg-projectPallet-secondary w-full text-white font-bold border-2 border-white" variant="outlined" onClick={() => setActive(!active)}>FECHAR</Button>
					</div>
				</div>
			</div>
		</div>
 	)
}

export default CategorySelector