import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';

export const InputSwitch = styled(Switch)(() => ({
  padding: 0,
  width: 45,
  height: 25,
  '& .Mui-checked':{
    '& + .MuiSwitch-track': {
     background: '#6359e9 !important',
     opacity: 1,
    }
  },
  '& .MuiSwitch-track': {
    background: '#4B4B99',
    borderRadius: 24 / 2,
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 18,
    height: 18,
    margin: '-5px',
    background: 'white'
  },
}));