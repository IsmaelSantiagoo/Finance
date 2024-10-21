import InputText from "@/components/InputText";
import { addEstablishment } from "@/pages/manage/services";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useState } from "react";

export const AddEstablishmentForm = ({ reloadData, onCancel, onConfirm }: FormProps) => {

  const [establishmentName, setEstablishmentName] = useState<string>('')
  const [establishmentLink, setEstablishmentLink] = useState<string>('')

  const clearData = () => {

    setEstablishmentLink('')
    setEstablishmentName('')
  }

  const handleAddEstablishment = async () => {

		if (establishmentName && establishmentLink) {

			try {
				const { message, status } = await addEstablishment({
          estabelecimentoId: 1,
          estabelecimentoNome: establishmentName,
          estabelecimentoLink: establishmentLink
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
        <InputText value={establishmentName} label="Nome:" placeholder="Insira o nome" onChange={(e) => setEstablishmentName(e)}/>
        <InputText value={establishmentLink} label="ícone" placeholder="Insira o link" onChange={(e) => setEstablishmentLink(e)}/>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleAddEstablishment()} className="bg-projectPallet-secondary text-white w-full">Adicionar</Button>
      </div>
    </div>
  )
}