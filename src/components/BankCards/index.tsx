import NuBank from "./NuBank"
import PicPay from "./PicPay"
import { BankCardsTypes } from "./types"
import UntitledCard from "./UntitledCard"

const BankCard = ({nome, usuario, valor}: BankCardsTypes) => {

  switch(nome.toLowerCase()) {

    case 'picpay':
      return <PicPay usuario={usuario} valor={valor}/>

    case 'nubank':
      return <NuBank usuario={usuario} valor={valor}/>

    default:
      return <UntitledCard usuario={usuario} valor={valor}/>
  }
}

export default BankCard