import Container from "@/components/Container"
import Layout from "@/components/Layout"
import { DarkThemeContext } from "@/context/darkTheme"
import { Button } from "@mui/material"
import { useContext } from "react"

export default function Settings() {

  const { isDark, toggleTheme } = useContext(DarkThemeContext)

  return (
    <Layout className='px-3' defaultActiveMenuIndex={4}>
      <Container className="p-3 bg-projectPallet-quaternary">
        <div className="flex gap-2">
          <h1 className="text-lg font-bold">Tema:</h1>
          <Button className="w-20 h-8 bg-white text-projectPallet-secondary font-bold" onClick={() => toggleTheme('light')}>CLARO</Button>
          <Button className="w-20 h-8 bg-projectPallet-primary text-projectPallet-secondary font-bold" onClick={() => toggleTheme('dark')}>ESCURO</Button>
        </div>
      </Container>
    </Layout>
  )
}