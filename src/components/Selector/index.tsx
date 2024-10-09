import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"

const Selector = ({ items, label, onChange }: SelectorTypes) => {

	const [value, setValue] = useState<SelectorItems>(items[0])
	const [active, setActive] = useState<boolean>(false)
	const select = useRef<HTMLDivElement>(null)

	useEffect(() => {

		onChange(value?.id)
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
							value && <img className="rounded-full w-10 h-10" src={`https://cdn.brandfetch.io/${value.url}/w/100/h/100`}/>
						}
						<span className="text-md font-bold p-2">{value ? value.label : 'Escolha uma opção'}</span>
					</div>
					<FontAwesomeIcon icon={faCaretDown} size="xl"/>
				</div>

				<div className="absolute w-[300px] h-[200px] overflow-auto mt-16 ml-24 z-50 p-2 bg-projectPallet-secondary rounded-xl flex flex-col gap-2 border-2 border-white" style={{ display: active ? 'flex' : 'none'}}>
					{
						items.map( ({ id, url, label }) => (
							<div key={label} className="flex gap-2 w-full items-center hover:bg-projectPallet-tertiary cursor-pointer rounded-xl p-2" onClick={() => {setValue({ id: id, url: url, label: label});setActive(false)}}>
								{
									url && <img className="rounded-full w-10 h-10" src={`https://cdn.brandfetch.io/${url}/w/100/h/100`} alt={label}/>
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

export default Selector