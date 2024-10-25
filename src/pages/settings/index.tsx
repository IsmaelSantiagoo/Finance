import Container from "@/components/Container"
import Layout from "@/components/Layout"
import { DarkThemeContext } from "@/context/darkTheme"
import Image from "next/image"
import { useContext, useEffect } from "react"
import lightThemeThumbnail from '@public/lightTheme-thumbnail.png'
import darkThemeThumbnail from '@public/darkTheme-thumbnail.png'
import { notify } from "@/utils/notify"

export default function Settings() {

  const { isDark, toggleTheme } = useContext(DarkThemeContext)

  return (
    <Layout className='px-3' defaultActiveMenuIndex={4}>
      <Container className="p-3 flex-col gap-3 flex">
        <h1 className="text-lg font-bold dark:text-white text-projectPalletLight-tertiary">Tema</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <Image 
              src={lightThemeThumbnail} 
              alt="Light theme thumbnail" 
              layout="responsive" 
              width={800} 
              height={600} 
              className="rounded-md cursor-pointer hover:scale-[1.01] transition-all duration-500"
              onClick={() => toggleTheme('light')}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Image 
              src={darkThemeThumbnail} 
              alt="Dark theme thumbnail" 
              layout="responsive" 
              width={800} 
              height={600} 
              className="rounded-md cursor-pointer hover:scale-[1.01] transition-all duration-500"
              onClick={() => toggleTheme('dark')}
            />
          </div>
        </div>
      </Container>
    </Layout>
  )
}
