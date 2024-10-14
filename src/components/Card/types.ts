import { StaticImageData } from "next/image";

export interface CardTypes {
  title?: string;
	icon?: string;
	desc?: string;
	thumbnail?: StaticImageData;
	buttonLabel?: string;
	link?: string;
}