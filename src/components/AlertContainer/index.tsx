import Container from "@/components/Container"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@mui/material"

export const AlertContainer = ({ onCancel, onConfirm, title, description }: AlertTypes) => {

  return (
    <Container className="flex flex-col gap-3 max-w-[40rem] p-2">
      <div className="flex flex-col gap-3">
        <div className="text-2xl flex gap-3 items-center justify-center font-bold">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl text-orange-500"/>
          <h1 className="dark:text-white text-projectPalletLight-tertiary">{title}</h1>
        </div>
        {
          description && <p className="text-center dark:text-white text-projectPalletLight-tertiary">{description}</p>
        }
      </div>
      <div className="flex gap-2">
        <Button onClick={onCancel} variant="outlined" className="w-full border-projectPallet-secondary text-projectPallet-secondary font-bold">CANCELAR</Button>
        <Button onClick={onConfirm} className="w-full bg-projectPallet-secondary text-white font-bold">CONFIRMAR</Button>
      </div>
    </Container>
  )
}