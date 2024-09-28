import { InputBase, MenuItem, Select, styled } from "@mui/material"
import { useState } from "react"

const InputSelect = ({ label, menuItems }: InputSelectTypes) => {

  const [value, setValue] = useState<string>(menuItems[0].value)

  const StyledInputSelect = styled(InputBase)(({ theme }) => ({
    width: '150px',
		'& .MuiInputBase-input': {
      width: '100%',
      borderRadius: 12,
			position: 'relative',
			backgroundColor: '#4B4B99',
			border: '1px solid #6359E9',
			fontSize: 18,
      color: '#fff',
			padding: '10px 0px 5px 12px',
			transition: theme.transitions.create(['border-color', 'box-shadow']),
		},
	}))

  const handleChange = (e:any) => {

    setValue(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="font-bold text-lg">{label}</label>
      <Select
        id={label}
        value={value}
        input={<StyledInputSelect/>}
        onChange={handleChange}
      >
        {
          menuItems.map( ({ value }) => (

            <MenuItem value={value}>{value}</MenuItem>
          ))
        }
      </Select>
    </div>
  )
}

export default InputSelect