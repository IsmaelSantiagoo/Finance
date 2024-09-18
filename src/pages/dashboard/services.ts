import axios from "axios";

const baseURl = process.env.API_URL

export const getTransactions = async () => {

  const response = await axios.get(`${baseURl}/transacoes`)

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