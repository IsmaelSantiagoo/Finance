import Image from "next/image"

const NuBank = () => {
  return (
    <div className="w-full flex flex-col justify-between h-[250px] bg-gradient-to-tl from-purple-950 to-purple-800 rounded-xl p-5">
      <div className="flex w-full h-full border justify-end">
        <span className="rounded-full w-10 h-10 absolute bg-yellow-500"></span>
        <span className="rounded-full w-10 h-10 absolute bg-opacity-80 mr-5 bg-red-500"></span>
      </div>
      <div className="w-full h-full border">
      </div>
    </div>
  )
}

export default NuBank