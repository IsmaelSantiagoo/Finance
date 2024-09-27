import untitled from '@assets/untitled.png';
import Image from 'next/image';

const UntitledCard = ({ valor, usuario }: BankCardTypes) => {
  return (
    <div className="w-full flex flex-col justify-between bg-gradient-to-tl from-zinc-800 to-zinc-500 h-[230px] rounded-xl p-5">
      <div className="flex flex-col">
        <div className="flex w-full h-10 items-center justify-between">
          <p className="text-zinc-300 w-full font-semibold">Current Balance</p>
        </div>
        <div className="w-full h-full flex items-center">
          <p className="text-3xl font-bold">
            {parseFloat(valor).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center gap-3">
        <Image src={untitled} alt='icone do cartao' width={70} height={100}/>
        <p className="text-xl text-white">{usuario}</p>
      </div>
    </div>
  );
};

export default UntitledCard;
