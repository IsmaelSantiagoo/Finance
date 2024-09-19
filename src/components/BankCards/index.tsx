import NuBank from "./NuBank"
import PicPay from "./PicPay"
import { BankCardTypes } from "./types"
import UntitledCard from "./UntitledCard"

const BankCard = ({cardName, name, total}: BankCardTypes) => {

  switch(cardName.toLowerCase()) {

    case 'picpay':
      return <PicPay name={name} total={total}/>

    case 'nubank':
      return <NuBank name={name} total={total}/>

    default:
      return <UntitledCard name={name} total={total}/>
  }
}

export default BankCard