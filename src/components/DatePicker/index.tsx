import React from "react"

const DatePicker = ({ dataInicio, label, onChange}: DataPickerTypes) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    onChange(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      {
        label &&
        <label htmlFor={label}className="text-lg text-white font-bold">{label}</label>
      }
      <input type="date"
        id={label}
        value={dataInicio}
        onChange={handleChange}
        className="rounded-lg bg-transparent border border-projectPallet-secondary hover:border-projectPallet-tertiary p-2 text-md w-full h-10 text-white outline-none focus:outline-projectPallet-secondary"
      />
    </div>
  )
}

export default DatePicker