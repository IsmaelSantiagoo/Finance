import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"

const Selector = ({ items, label, defaultValue, onChange, showBrand = false }: SelectorTypes) => {

	const [value, setValue] = useState<SelectorItems>()
	const [active, setActive] = useState<boolean>(false)
	const select = useRef<HTMLDivElement>(null)

	useEffect(() => {

		if (defaultValue) {
			onChange(defaultValue.id)
			setValue(defaultValue)
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
							value && showBrand && <img className="rounded-full w-10 h-10 bg-white" src={value.url ? `https://cdn.brandfetch.io/${value.url}/w/400/h/400`: 'https://www.advocacianunes.com.br/wp-content/uploads/2022/04/logo-pix-icone-1024.png'}/>
						}
						<span className="text-md font-bold p-2">{value ? value.label : 'Escolha uma opção'}</span>
					</div>
					<FontAwesomeIcon icon={faCaretDown} size="xl"/>
				</div>

				<div className="absolute w-[300px] max-h-[200px] overflow-auto mt-16 ml-24 z-50 p-2 bg-projectPallet-secondary rounded-xl flex flex-col gap-2 border-2 border-white" style={{ display: active ? 'flex' : 'none'}}>
					{
						items.map( ({ id, url, label }) => (
							<div key={label} className="flex gap-2 w-full items-center hover:bg-projectPallet-tertiary cursor-pointer rounded-xl p-2" onClick={() => {setValue({ id: id, url: url, label: label});setActive(false)}}>
								{
									value && showBrand && <img className="rounded-full w-10 h-10 bg-white" src={url ? `https://cdn.brandfetch.io/${url}/w/400/h/400`: 'https://www.advocacianunes.com.br/wp-content/uploads/2022/04/logo-pix-icone-1024.png'} alt={label}/>
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