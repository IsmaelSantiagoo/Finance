import InputText from "@/components/InputText";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useState } from "react";
import { addCard } from "../../../services";
import InputBRL from "@/components/InputBRL";

export const AddCardForm = ({ reloadData, onCancel, onConfirm }: FormProps) => {

  const [cardUser, setCardUser] = useState<string>('')
  const [cardAgency, setCardAgency] = useState<string>('')
  const [cardName, setCardName] = useState<string>('')
  const [cardValue, setCardValue] = useState<string>('')

  const clearData = () => {

    setCardUser('')
    setCardAgency('')
    setCardName('')
    setCardValue('')
  }

  const handleAddCard = async () => {

		if (cardUser && cardAgency && cardName && cardValue) {

			try {
				const { message, status } = await addCard({
          cartaoId: 1,
          cartaoAgencia: cardAgency,
          cartaoUsuario: cardUser,
          cartaoNome: cardName,
          cartaoValor: cardValue
				});
	
				notify(message, status);
				if (status === 'success') {

					reloadData()
          onConfirm
          clearData()
				};
			} catch {
	
				notify('Erro ao inserir dados!', 'error');
			}
		} else {

			notify('Preencha todos os dados!', 'warning')
		}
	}

  return (

    <div>
      <div className="flex flex-col gap-3 w-[50rem]">
        <InputText value={cardUser} label="Nome do usuário:" placeholder="Insira o nome" onChange={(e) => setCardUser(e)}/>
        <InputText value={cardAgency} label="Agência" placeholder="Insira o link" onChange={(e) => setCardAgency(e)}/>
        <InputText value={cardName} label="Nome do cartão" placeholder="Insira o link" onChange={(e) => setCardName(e)}/>
        <InputBRL value={cardValue} label="Valor" placeholder="Insira o link" onChange={(e) => setCardValue(e)}/>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleAddCard()} className="bg-projectPallet-secondary text-white w-full">Adicionar</Button>
      </div>
    </div>
  )
}