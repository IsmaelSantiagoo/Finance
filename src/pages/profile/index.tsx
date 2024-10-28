import Layout from "@/components/Layout";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Profile() {
  return (
    <Layout defaultActiveMenuIndex={8}>
      <Button className="bg-red-500 rounded-xl text-white flex gap-2" onClick={() => signOut()}>
        <FontAwesomeIcon icon={faSignOut}/>
        DESCONECTAR
      </Button>
    </Layout>
  )
}