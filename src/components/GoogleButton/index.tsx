import Image from "next/image";
import Google from '@public/google.png'

export default function GoogleButton() {
  return (
    <div className="w-10 h-10 bg-white rounded-full p-2 cursor-pointer border-2 border-projectPallet-secondary">
      <Image src={Google} alt="Logo do google"/>
    </div>
  )
}