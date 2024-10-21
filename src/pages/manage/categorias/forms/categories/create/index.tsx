import InputText from "@/components/InputText";
import { getCategorias } from "@/services/categorias";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { addCategory } from "../../../services";

export const AddCategoryForm = ({ reloadData, onCancel, onConfirm }: CategoryFormProps) => {

  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryIcon, setCategoryIcon] = useState<string>('')
  const [categoryColor, setCategoryColor] = useState<string>('')
  const [categories, setCategories] = useState<SelectorItems[]>([])

  useEffect(() => {

		getCategorias().then((data) => {

      const array = data.map( d => ({ id: d.categoriaId, label: d.categoriaNome, color: d.categoriaCor, icon: d.categoriaIcone}))

      if (array) setCategories(array)
    })
	}, [])

  const clearData = () => {

    setCategoryName('')
    setCategoryIcon('')
    setCategoryColor('')
  }

  const handleAddCategory = async () => {

		if (categoryName && categoryIcon && categoryColor) {

			try {
				const { message, status } = await addCategory({
          categoriaId: 1,
					categoriaNome: categoryName,
					categoriaIcone: categoryIcon,
					categoriaCor: categoryColor
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
        <InputText value={categoryName} label="Nome:" placeholder="Insira o nome" onChange={(e) => setCategoryName(e)}/>
        <InputText value={categoryIcon} label="ícone" placeholder="Insira o ícone" onChange={(e) => setCategoryIcon(e)}/>
        <InputText value={categoryColor} label="Cor" placeholder="Insira a cor" onChange={(e) => setCategoryColor(e)}/>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleAddCategory()} className="bg-projectPallet-secondary text-white w-full">Adicionar</Button>
      </div>
    </div>
  )
}