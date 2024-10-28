import Image from "next/image"
import Header from "../Header"
import { LayoutProps } from "./types"
import Logo from '@public/lightLogo.png'
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartSimple, faCircleQuestion, faGauge, faGear, faMoon, faShield, faSliders, faWallet } from "@fortawesome/free-solid-svg-icons"
import { MenuItem } from "../MenuPanel/types"
import { InputSwitch } from "../InputSwitch"
import MenuProfileItem from "../MenuProfileItem"
import Avatar from '@public/avatar.svg'
import InputSearch from "../InputSearch"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import MenuPanel from "../MenuPanel"
import Sidebar from "../Sidebar"

const Layout = ({ children, className, defaultActiveMenuIndex }: LayoutProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [menu, setMenu] = useState<MenuItem[]>([])

  useEffect(() => {
    const getMenus = () => {
      const menus: MenuItem[] = [
        {
          icon: <FontAwesomeIcon icon={faGauge} />,
          text: "Dashboard",
          link: "/dashboard",
        },
        {
          icon: <FontAwesomeIcon icon={faChartSimple} />,
          text: "Analytics",
          link: "/analytics",
        },
        {
          icon: <FontAwesomeIcon icon={faWallet} />,
          text: "My Wallet",
        },
        {
          icon: <FontAwesomeIcon icon={faGear} />,
          text: "Manage",
          link: "/manage",
        },
        {
          icon: <FontAwesomeIcon icon={faSliders} />,
          text: "Settings",
          link: "/settings",
        },
        {
          icon: <FontAwesomeIcon icon={faShield} />,
          text: "Security",
        },
        {
          icon: <FontAwesomeIcon icon={faCircleQuestion} />,
          text: "Help Center",
        },
        {
          icon: <FontAwesomeIcon icon={faMoon} />,
          text: "Dark Mode",
          control: <InputSwitch onChange={(e) => {}} defaultChecked />,
        },
      ]
  
      setMenu(menus)
    }
  
    // Executa apenas quando o componente está montado no cliente
    if (typeof window !== "undefined") {
      getMenus()
    }
  }, [])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  return (
    <main className="max-h-screen max-w-screen flex bg-projectPalletLight-secondary dark:bg-projectPallet-primary overflow-hidden gap-3 transition-all duration-500">
      <Sidebar className="bg-projectPalletLight-primary dark:bg-projectPallet-primary py-10 h-screen px-5 flex flex-col justify-between rounded-r-xl">
        <div className="flex flex-col gap-10">
          <Image src={Logo} alt="logomarca" className="w-[70%]" />
          {menu.length > 0 && (
            <MenuPanel items={menu} menuDivider={5} defaultActiveIndex={defaultActiveMenuIndex} />
          )}
        </div>
        <MenuProfileItem img={Avatar} username="Ismael Santiago" ocupation="Analista de desenvolvimento" />
      </Sidebar>

      <div className="max-h-screen w-full flex flex-col">
        <Header className="flex sticky top-0 p-3 justify-between items-end bg-projectPalletLight-secondary dark:bg-projectPallet-primary pb-3">
          <div className="w-full">
            <h1 className="font-bold text-xl dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary">
              Welcome Back, Ismael 👋
            </h1>
            <p className="text-zinc-500">Here's what's happening with your store today</p>
          </div>
          <InputSearch
            placeholder="Search for anything..."
            className="gap-3 bg-projectPalletLight-quaternary dark:bg-projectPallet-quaternary"
            inputClassName="bg-transparent dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary placeholder:dark:text-projectPallet-tertiary placeholder:text-projectPalletLight-tertiary"
          />
        </Header>
        <div className={className}>{children}</div>
      </div>
    </main>
  )
}

export default Layout
