import { PopupTypes } from "./types"

const Popup = ({ children, visible = false}: PopupTypes) => {
  return (
    visible && 
    <div className={`w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center`}>
      <div className="w-[800px] h-auto bg-projectPallet-quaternary rounded-xl p-5">
        { children }
      </div>
    </div>
  )
}

export default Popup