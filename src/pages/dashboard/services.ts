import axios from "axios";

const baseURl = process.env.API_URL

export const getTransactions = async (dataInicio?: string, categoriaID?: number): Promise<TransactionResponse> => {

  const filters: TransactionPayload = {}

  if (dataInicio) filters.dataInicio = dataInicio
  if (categoriaID) filters.categoriaID = categoriaID

  const response = await axios.post(`${baseURl}/transacoes`, filters)

  if (response.status === 200) {

    const data = response.data

    return {
      status: 'success',
      data: data
    }
  } else {
    
    return {
      status: 'error',
      data: []
    }
  }
}

export const getEstablishmentById = async (id: number) => {

  const response = await axios.get(`${baseURl}/estabelecimentos/${id}`)

  if (response.status === 200) {

    return {
      status: 'success',
      data: response.data
    }
  } else {

    return {
      status: 'error',
      data: []
    }
  }
}

export const getCards = async (): Promise<CardResponse> => {

  const response = await axios.get(`${baseURl}/cartoes`)

  if (response.status === 200) {

    const data = response.data

    return {
      data: data
    }
  } else {

    return {
      data: []
    }
  }
}

export const getCategories = async () => {

  const response = await axios.get(`${baseURl}/categorias`)

  if (response.status === 200) {

    const data = response.data

    return data
  } else {

    return []
  }
}

export const getCategorie = async (id: number): Promise<CategoryResponse> => {

  const response = await axios.get(`${baseURl}/categorias/${id}`)

  if (response.status === 200) {

    const data = response.data

    return {
      data: data
    }
  } else {

    return {
      data: []
    }
  }
}