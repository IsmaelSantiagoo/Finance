import axios from "axios";

const baseUrl = process.env.API_URL

export const getCategorias = async () => {

	const response = await axios.get(`${baseUrl}/categorias`)

	if (response.status === 200) {

		const data: CategoryTypes[] = response.data

		return data
	} else {

		return []
	}
}

export const getCategory = async (id: number) => {

	const response = await axios.get(`${baseUrl}/categorias/${id}`)

	if (response.status === 200) {

		const data: CategoryTypes[] = response.data

		return data
	} else {

		return []
	}
}

export const updateCategory = async ({ categoriaId, categoriaNome, categoriaIcone, categoriaCor }: CategoryTypes) => {

  const response = await axios.patch(`${baseUrl}/categorias/${categoriaId}`, {
    categoriaNome: categoriaNome,
		categoriaIcone: categoriaIcone,
		categoriaCor: categoriaCor
  })

  if (response.status === 200) {

    return {
      status: 'success',
      message: 'Dados atualizados com sucesso!'
    }
  } else {

    return {
      status: 'error',
      message: 'Não foi possível atualizar os dados!'
    }
  }
}