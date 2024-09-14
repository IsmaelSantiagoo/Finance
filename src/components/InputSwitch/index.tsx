import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';

export const InputSwitch = styled(Switch)(() => ({
  padding: 8,
  width: 60,
  height: 40,
  '& .Mui-checked':{
    '& + .MuiSwitch-track': {
     background: '#6359e9 !important',
     opacity: 1,
    }
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 18,
    height: 18,
    margin: 2,
    background: 'white'
  },
}));