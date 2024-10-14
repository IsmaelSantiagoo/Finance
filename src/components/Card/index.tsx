import { Button } from "@mui/material"
import { CardTypes } from "./types"
import Image from "next/image"
import Link from "next/link"

const Card = ({ title, icon, desc, thumbnail, buttonLabel, link = ''}: CardTypes) => {
  return (
		<div className="p-2 bg-projectPallet-secondary rounded-xl flex flex-col gap-2 w-full justify-between">
			<div>
				<div className="flex justify-between items-center">
					<h1 className="text-xl">{title}</h1>
					<i className={`fa fa-${icon} text-xl`}></i>
				</div>
				<div>
					<p>{desc}</p>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="">
					{ thumbnail && <Image src={thumbnail} className="rounded-xl" alt="thumbnail"/>}
				</div>
				<Link className="bg-white font-bold w-full rounded-xl text-projectPallet-secondary text-center p-2" href={link}>{buttonLabel}</Link>
			</div>
		</div>
	)
}

export default Card