import Container from "@/components/Container";
import InputText from "@/components/InputText";
import { addEstablishment } from "@/pages/manage/services";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useState } from "react";

export const AddEstablishmentForm = ({ onCancel, onConfirm }: FormProps) => {

  const [establishmentName, setEstablishmentName] = useState<string>('')
  const [establishmentLink, setEstablishmentLink] = useState<string>('')

  const clearData = () => {

    setEstablishmentLink('')
    setEstablishmentName('')
  }

  const handleAddEstablishment = async () => {

		if (establishmentName) {

			try {
				const { message, status } = await addEstablishment({
          estabelecimentoId: 1,
          estabelecimentoNome: establishmentName,
          estabelecimentoLink: establishmentLink
				});
	
				notify(message, status);
				if (status === 'success') {

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

    <Container className="max-w-[50rem] p-3 border-2 border-projectPallet-secondary">
      <div className="flex flex-col gap-3">
        <InputText value={establishmentName} label="Nome:" placeholder="Insira o nome" onChange={(e) => setEstablishmentName(e)} maxLength={30}/>
        <InputText value={establishmentLink} label="Link:" placeholder="Insira o link" onChange={(e) => setEstablishmentLink(e)}/>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border-2 font-bold text-projectPallet-secondary border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleAddEstablishment().then(onConfirm)} className="bg-projectPallet-secondary text-white w-full">Adicionar</Button>
      </div>
    </Container>
  )
}