import Container from "@/components/Container";
import InputText from "@/components/InputText";
import { getCategory, updateCategory } from "@/services/categorias";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const UpdateCategoryForm = ({ id, onCancel, onConfirm }: FormProps) => {

  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryIcon, setCategoryIcon] = useState<string>('')
  const [categoryColor, setCategoryColor] = useState<string>('')

  const readCategories = () => {

    if (id) getCategory(id).then( (data) => {

      const {
        categoriaNome,
        categoriaIcone,
        categoriaCor
      }  = data[0]

      setCategoryName(categoriaNome)
      setCategoryIcon(categoriaIcone)
      setCategoryColor(categoriaCor)
    }).catch(() => {

      notify('Erro ao buscar categoria!', 'error')
    })
  }

  useEffect(() => {

    readCategories()
  }, [])

  const clearData = () => {

    setCategoryName('')
    setCategoryIcon('')
    setCategoryColor('')
  }

  const handleUpdateCategory = async () => {

		if (id && categoryName && categoryIcon && categoryColor) {

			try {
				const { message, status } = await updateCategory({
					categoriaId: id,
          categoriaNome: categoryName,
          categoriaIcone: categoryIcon,
          categoriaCor: categoryColor
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

    <Container className="max-w-[50rem] p-3 border-2 border-projectPallet-secondary">
      <div className="flex flex-col gap-3">
        <InputText value={categoryName} label="Nome:" placeholder="Insira o nome" onChange={(e) => setCategoryName(e)} maxLength={30}/>
        <InputText value={categoryIcon} label="ícone" placeholder="Insira o ícone" onChange={(e) => setCategoryIcon(e)}/>
        <InputText value={categoryColor} label="Cor" placeholder="Insira a cor" onChange={(e) => setCategoryColor(e)} maxLength={30}/>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border-2 text-projectPallet-secondary font-bold border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleUpdateCategory().then(onConfirm)} className="bg-projectPallet-secondary text-white w-full">Atualizar</Button>
      </div>
    </Container>
  )
}