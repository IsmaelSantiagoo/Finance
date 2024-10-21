import InputText from "@/components/InputText";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getCard } from "../../../services";
import { updateCard } from "@/services/cartoes";
import InputBRL from "@/components/InputBRL";

export const UpdateCardForm = ({ id, onCancel, onConfirm }: FormProps) => {

  const [cardUser, setCardUser] = useState<string>('')
  const [cardAgency, setCardAgency] = useState<string>('')
  const [cardName, setCardName] = useState<string>('')
  const [cardValue, setCardValue] = useState<string>('')

  const readCards = () => {

    if (id) getCard(id).then( (data) => {

      const {
        cartaoUsuario,
        cartaoAgencia,
        cartaoNome,
        cartaoValor
      }  = data.data[0]

      setCardAgency(cartaoAgencia)
      setCardUser(cartaoUsuario)
      setCardName(cartaoNome)
      setCardValue(cartaoValor)
    }).catch(() => {

      notify('Erro ao buscar cartão!', 'error')
    })
  }

  useEffect(() => {

    readCards()
  }, [])

  const clearData = () => {

    setCardAgency('')
    setCardUser('')
    setCardName('')
    setCardValue('')
  }

  const handleUpdateCard = async () => {

		if (id && cardAgency && cardUser && cardName && cardValue) {

			try {
				const { message, status } = await updateCard({
					cartaoId: id,
          cartaoAgencia: cardAgency,
          cartaoUsuario: cardUser,
          cartaoNome: cardName,
          cartaoValor: cardValue
				});
	
				notify(message, status);

				if (status === 'success') {

          clearData()
				};
			} catch {
	
				notify('Erro ao atualizar dados!', 'error');
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
        <Button onClick={() => handleUpdateCard().then(onConfirm)} className="bg-projectPallet-secondary text-white w-full">Atualizar</Button>
      </div>
    </div>
  )
}