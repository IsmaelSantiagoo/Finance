import { InputBase, MenuItem, Select, styled } from "@mui/material"
import { useState } from "react"

const InputSelect = ({ label, menuItems, onChange = () => {}}: InputSelectTypes) => {

  const [value, setValue] = useState<string>(menuItems[0].value)

  const StyledInputSelect = styled(InputBase)(({ theme }) => ({
    width: '150px',
		'& .MuiInputBase-input': {
      width: '100%',
      borderRadius: 12,
			position: 'relative',
			backgroundColor: '#6359E9',
			border: '1px solid #6359E9',
			fontSize: 16,
      color: '#fff',
			padding: '4px 0px 4px 12px',
			transition: theme.transitions.create(['border-color', 'box-shadow']),
		},
	}))

  const handleChange = (e:any) => {

    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      { label && <label htmlFor={label} className="font-bold text-lg dark:text-white text-projectPalletLight-tertiary">{label}</label>}
      <Select
        id={label}
        value={value}
        input={<StyledInputSelect/>}
        onChange={handleChange}
      >
        {
          menuItems.map( ({ value }, index) => (

            <MenuItem value={value} key={index}>{value}</MenuItem>
          ))
        }
      </Select>
    </div>
  )
}

export default InputSelect