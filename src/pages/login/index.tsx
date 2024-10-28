import Image from "next/image";
import Logo from '@public/logo-dark.png'
import InputText from "@/components/InputText";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import GoogleButton from "@/components/GoogleButton";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";

export default function Login() {

  const { data: session } = useSession()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleLogin = () => {
    if (isLogin) {
      console.log('Realizando login')
    } else {
      console.log('Realizando registro')
    } 
  }

  useEffect(() => {
    if (session && router) {
      router.push('/dashboard')
    }
  }, [session, router])

  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-projectPallet-secondary to-projectPallet-primary flex items-center justify-center text-projectPallet-primary font-thin">
      <div className="w-[400px] bg-white rounded-md p-2 gap-2 flex flex-col">
        <div className="w-full flex justify-center h-10">
          <Image src={Logo} alt="logomarca" width={130}/>
        </div>
        <div className="flex flex-col gap-2">
          <InputText label="Usuário" value={username} placeholder="Insira o nome de usuário" onChange={(e) => setUsername(e)}/>
          <InputText label="Senha" value={password} placeholder="Insira sua senha" onChange={(e) => setPassword(e)} type="password"/>
          {
            !isLogin && <InputText label="Confirme sua senha" placeholder="Insira sua senha novamente" value={confirmPassword} onChange={(e) => setConfirmPassword(e)} type="password"/>
          }
          {
            isLogin && <p className="text-end hover:text-projectPallet-secondary cursor-pointer">Esqueceu sua senha?</p>
          }
        </div>
        <div className="w-full">
          <Button className="bg-projectPallet-secondary text-white font-bold w-full rounded-lg" onClick={() => handleLogin()}>{ isLogin ? 'ENTRAR' : 'REGISTRAR'}</Button>
        </div>
        {
          isLogin &&  <div className="flex flex-col gap-3">
          <p className="text-center">entrar com</p>
          <div className="w-full flex justify-center">
            <GoogleButton onClick={signIn}/>
          </div>
        </div>
        }
        <p className="text-center">{ isLogin ? 'ou registre-se usando' : 'ou'}</p>
        <div className="w-full">
          <Button className="text-projectPallet-secondary font-bold w-full rounded-lg border-2 border-projectPallet-secondary" variant="outlined" onClick={() => setIsLogin(!isLogin)}>{ !isLogin ? 'ENTRAR' : 'REGISTRAR'}</Button>
        </div>
      </div>
    </div>
  )
}