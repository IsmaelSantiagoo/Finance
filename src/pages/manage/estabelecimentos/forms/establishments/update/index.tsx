import InputText from "@/components/InputText";
import { getEstablishmentById } from "@/pages/dashboard/services";
import { getEstablishments, updateEstablishment } from "@/services/estabelecimentos";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const UpdateEstablishmentForm = ({ id, onCancel, onConfirm }: FormProps) => {

  const [establishmentName, setEstablishmentName] = useState<string>('')
  const [establishmentLink, setEstablishmentLink] = useState<string>('')

  const readEstablishments = () => {

    if (id) getEstablishmentById(id).then( (data) => {

      const {
        estabelecimentoNome,
        estabelecimentoLink
      }  = data.data[0]

      setEstablishmentName(estabelecimentoNome)
      setEstablishmentLink(estabelecimentoLink)
    }).catch(() => {

      notify('Erro ao buscar categoria!', 'error')
    })
  }

  useEffect(() => {

    readEstablishments()
  }, [])

  const clearData = () => {

    setEstablishmentName('')
    setEstablishmentLink('')
  }

  const handleUpdateestablishment = async () => {

		if (id && establishmentName && establishmentLink) {

			try {
				const { message, status } = await updateEstablishment({
					estabelecimentoId: id,
          estabelecimentoNome: establishmentName,
          estabelecimentoLink: establishmentLink,
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
        <InputText value={establishmentName} label="Nome:" placeholder="Insira o nome" onChange={(e) => setEstablishmentName(e)} maxLength={30}/>
        <InputText value={establishmentLink} label="ícone" placeholder="Insira o ícone" onChange={(e) => setEstablishmentLink(e)}/>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleUpdateestablishment().then(onConfirm)} className="bg-projectPallet-secondary text-white w-full">Atualizar</Button>
      </div>
    </div>
  )
}