import Image from 'next/image'
import Link from 'next/link'

const MenuProfileItem = ({img, username, active}: MenuProfileItemProps) => {
  return (
    <Link href={'/profile'}>
      <div className={`flex items-center justify-between rounded-xl p-3 ${active && 'bg-projectPallet-secondary'}`}>
        <div className="flex gap-2 items-center">
          <Image src={img} alt="foto de perfil" width={50}/>
          <div className="font-bold max-w-[130px]">
            <h2 className='text-md truncate'>{username}</h2>
            <p className="text-sm font-light text-zinc-300 truncate">Meu perfil</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MenuProfileItem