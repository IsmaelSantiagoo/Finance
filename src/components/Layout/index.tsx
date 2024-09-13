import Image from "next/image"
import Header from "../Header"
import Sidebar from "../Sidebar"
import { LayoutProps } from "./types"
import Logo from '@public/logo.png'
import MenuPanel from "../MenuPanel"
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartSimple, faCircleQuestion, faGauge, faGear, faMoon, faShield, faUser, faWallet } from "@fortawesome/free-solid-svg-icons"
import { MenuItem } from "../MenuPanel/types"
import { InputSwitch } from "../InputSwitch"
import MenuProfileItem from "../MenuProfileItem"
import Avatar from '@public/avatar.svg'
import InputSearch from "../InputSearch"

const Layout = ({children, className}: LayoutProps) => {

  const [menu, setMenu] = useState<MenuItem[]>([])

  useEffect(() => {
    
    const getMenus = () => {

      const menus: MenuItem[] = [
        {
          icon: <FontAwesomeIcon icon={ faGauge }/>,
          text: 'Dashboard',
        },
        {
          icon: <FontAwesomeIcon icon={ faChartSimple }/>,
          text: 'Analytics',
        },
        {
          icon: <FontAwesomeIcon icon={ faWallet }/>,
          text: 'My Wallet',
        },
        {
          icon: <FontAwesomeIcon icon={ faUser }/>,
          text: 'Accounts',
        },
        {
          icon: <FontAwesomeIcon icon={ faGear }/>,
          text: 'Settings',
        },
        {
          icon: <FontAwesomeIcon icon={ faShield }/>,
          text: 'Security',
        },
        {
          icon: <FontAwesomeIcon icon={ faCircleQuestion }/>,
          text: 'Help Center',
        },
        {
          icon: <FontAwesomeIcon icon={ faMoon }/>,
          text: 'Dark Mode',
          control: <InputSwitch defaultChecked/>
        }
      ]

      setMenu(menus)
    }

    getMenus()
  }, [])

  return (
    <main className="max-h-screen max-w-screen flex bg-projectPallet-primary overflow-hidden">

      <Sidebar className="bg-projectPallet-primary py-10 h-screen px-5 flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <Image
            src={Logo}
            alt="logomarca"
            className="w-[70%]"
          />
          <MenuPanel items={menu} menuDivider={5}/>
        </div>
        <MenuProfileItem img={Avatar} username="Ismael Santiago" ocupation="Analista de desenvolvimento"/>
      </Sidebar>

      <div className="max-h-screen w-full flex flex-col">
        <Header className="flex sticky top-0 p-5 justify-between items-end bg-projectPallet-primary pb-5">
          <div className="w-full">
            <h1 className="font-bold text-2xl">Welcome Back, Ismael 👋</h1>
            <p className="text-zinc-500">Here&apos;s what&apos;s happening with your store today</p>
          </div>
          <div className="min-w-[35%]">
            <InputSearch placeholder="Search for anything..." className="gap-3 bg-projectPallet-quaternary" inputClassName="bg-transparent text-white placeholder:text-projectPallet-tertiary"/>
          </div>
        </Header>
        <div className={className}>
          {children}
        </div>
      </div>

    </main>
  )
}

export default Layout