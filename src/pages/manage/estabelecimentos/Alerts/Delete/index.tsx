import Container from "@/components/Container"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@mui/material"

export const DeleteTransactionAlert = ({ onCancel, onConfirm }: AlertTypes) => {

  return (
    <Container className="flex flex-col gap-3 w-[40rem] p-2">
      <div className="flex flex-col gap-3">
        <div className="text-2xl flex gap-3 items-center justify-center font-bold">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl text-orange-500"/>
          <h1>Você realmente deseja deletar esta transação?</h1>
        </div>
        <p className="text-center">Deletar esse dado fará com que você o perca do histórico porém o valor não será estornado para o seu cartão automaticamente! Para isso você deve realizar um estorno!</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onCancel} variant="outlined" className="w-full border-projectPallet-secondary text-projectPallet-secondary font-bold">CANCELAR</Button>
        <Button onClick={onConfirm} className="w-full bg-projectPallet-secondary text-white font-bold">CONFIRMAR</Button>
      </div>
    </Container>
  )
}