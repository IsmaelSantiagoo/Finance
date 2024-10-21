import Image from "next/image"
import picpay from '@assets/picpay-logoW.png'

const PicPay = ({usuario, valor}: BankCardTypes) => {
  return (
    <div className="w-full flex flex-col justify-between h-[230px] bg-gradient-to-tl from-green-900 to-green-600 rounded-xl p-5">
      <div className="flex flex-col">
        <div className="flex w-full h-10 items-center justify-between">
          <p className="text-zinc-300 w-full font-semibold">Current Balance</p>
          <div className="w-full h-10 flex justify-end">
            <span className="rounded-full w-10 h-10 relative right-[-20px] bg-opacity-85 bg-red-500"></span>
            <span className="rounded-full w-10 h-10 bg-yellow-500"></span>
          </div>
        </div>
        <div className="w-full h-full flex items-center">
          <p className="text-3xl font-bold">{parseFloat(valor).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>
      <div className="w-full flex items-center gap-3">
        <Image src={picpay} alt="ícone nubank" width={60} height={100}/>
        <p className="text-xl text-white">{usuario}</p>
      </div>
    </div>
  )
}

export default PicPay