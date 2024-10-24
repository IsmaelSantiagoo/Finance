import untitled from '@assets/untitled.png';
import Image from 'next/image';

const UntitledCard = ({ valor, usuario }: BankCardTypes) => {
  return (
    <div className="w-full flex flex-col justify-between bg-gradient-to-tl from-zinc-800 to-zinc-500 h-[170px] rounded-xl p-3">
      <div className="flex flex-col">
        <div className="flex w-full h-8 items-start justify-between">
          <p className="text-zinc-300 w-full font-semibold">Current Balance</p>
          <div className="w-full h-10 flex justify-end">
            <span className="rounded-full w-8 h-8 relative right-[-20px] bg-opacity-85 bg-red-500"></span>
            <span className="rounded-full w-8 h-8 bg-yellow-500"></span>
          </div>
        </div>
        <div className="w-full h-full flex items-center">
          <p className="text-2xl font-bold">{parseFloat(valor).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>
      <div className="w-full flex items-center gap-3">
        <Image src={untitled} alt="ícone indefinido" width={30} height={100}/>
        <p className="text-md text-white">{usuario}</p>
      </div>
    </div>
  );
};

export default UntitledCard;
