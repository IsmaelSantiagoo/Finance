import axios from "axios";

const baseURl = process.env.API_URL

export const getTransactions = async () => {

  const response = await axios.get(`${baseURl}/transactions`)

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

export const getTransactionById = async (id: number) => {

  const response = await axios.get(`${baseURl}/transactions/${id}`)

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