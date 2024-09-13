import { TimelineDot } from "@mui/lab"
import { CarouselTypes } from "./types"
import { useState } from "react"

const Carousel = ({ children }: CarouselTypes) => {

  const [currentItem, setCurrentItem] = useState<number>(0)

  return (
    <div className="w-full flex flex-col items-center">
      { 
        Array.isArray(children) ? children[currentItem] : children
      }
      <div className="flex gap-2">
        { 
          Array.isArray(children) &&
          children.map((child, index) => (
            <TimelineDot key={index} className={`bg-projectPallet-secondary rounded-md cursor-pointer transition-all duration-200 ${index === currentItem ? 'w-8' : 'w-2 bg-indigo-600'}`} onClick={() => setCurrentItem(index)}/>
          ))
        }
      </div>
    </div>
  )
}

export default Carousel