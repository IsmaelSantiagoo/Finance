import React from "react"

const InputText = ({ value, label, placeholder, maxLength, onChange }: InputTextTypes) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    onChange((e.target.value))
  }

  return (
    <div className="flex flex-col gap-2">
      {
        label &&
        <label htmlFor={label} className="text-lg text-white font-bold">
          {label}
        </label>
      }
      <input type="text"
        id={label}
        placeholder={placeholder}
        value={value}
        className="rounded-lg bg-transparent border border-projectPallet-secondary hover:border-projectPallet-tertiary p-2 text-md w-full text-white outline-none focus:outline-projectPallet-secondary"
        onChange={handleChange}
        maxLength={maxLength}
      />
      {
        value.length === maxLength && <span className="text-red-500">Número máximo de caracteres atingido!</span>
      }
    </div>
  )
}

export default InputText