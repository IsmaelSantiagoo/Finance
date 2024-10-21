import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { decodeAction } from "next/dist/server/app-render/entry-base"
import { useEffect, useRef, useState } from "react"

const CategorySelector = ({ items, label, defaultValue, onChange }: CategorySelectorTypes) => {

	const [value, setValue] = useState<CategorySelectorItems>()
	const [active, setActive] = useState<boolean>(false)
	const select = useRef<HTMLDivElement>(null)

	useEffect(() => {

		if (defaultValue) {
			setValue(defaultValue)
			onChange(defaultValue.id)
		}
	}, [items, defaultValue])

	useEffect(() => {

		if (value) onChange(value.id)
	}, [value])

	const handleClickOutside = (event: MouseEvent) => {
		if (select.current && !select.current.contains(event.target as Node)) {
		  setActive(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
	
		return () => {
		  document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div className="w-full flex flex-col gap-2">
			<label htmlFor={label} className="text-lg font-bold">{label}</label>
			<div className="w-full flex flex-col gap-2" ref={select} id={label}>
				<div className="flex gap-2 w-full items-center justify-between bg-projectPallet-secondary hover:bg-projectPallet-tertiary cursor-pointer rounded-xl p-2" onClick={() => setActive(!active)}>
					<div className="flex gap-2 items-center">
						{
							value && <i className={`fa fa-${value.icon} p-3 text-md rounded-full`} style={{ background: `${value.color}`}}></i>
						}
						<span className="text-md font-bold p-2">{value ? value.label : 'Escolha uma opção'}</span>
					</div>
					<FontAwesomeIcon icon={faCaretDown} size="xl"/>
				</div>

				<div className="absolute w-[300px] h-[200px] overflow-auto mt-16 ml-24 z-50 p-2 bg-projectPallet-secondary rounded-xl flex flex-col gap-2 border-2 border-white" style={{ display: active ? 'flex' : 'none'}}>
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
			</div>
		</div>
 	)
}

export default CategorySelector