import axios from "axios"

const baseURl = process.env.API_URL;

export const addCategory = async ({ categoriaId, categoriaNome, categoriaCor, categoriaIcone }: CategoryTypes) => {

  const response = await axios.post(`${baseURl}/categorias`, {
    categoriaNome: categoriaNome,
    categoriaIcone: categoriaIcone,
    categoriaCor: categoriaCor,
  })

  if ( response.status === 201) {

    return {
      status: 'success',
      message: 'Dados inseridos com sucesso!',
    }
  } else if ( response.status === 400) {
    
    return {
      status: 'error',
      message: 'Não foi possível inserir os dados!'
    }
  } else {

    return {
      status: 'warning',
      message: 'Dados incompletos!'
    }
  }
}


export const deleteCategory = async (id: number) => {

  const response = await axios.delete(`${baseURl}/categorias/${id}`)

  if (response.status === 204) {

    return {
      status: 'success',
      message: 'Categoria removida com sucesso!'
    }
  } else {

    return {
      status: 'error',
      message: 'Erro ao remover a categoria!'
    }
  }
}
