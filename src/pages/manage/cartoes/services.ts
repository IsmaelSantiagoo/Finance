import axios from "axios"

const baseURl = process.env.API_URL;

export const addCard = async ({ cartaoId, cartaoUsuario, cartaoAgencia, cartaoNome, cartaoValor }: CardTypes) => {

  const response = await axios.post(`${baseURl}/cartoes`, {
    cartaoUsuario: cartaoUsuario,
    cartaoAgencia: cartaoAgencia,
    cartaoNome: cartaoNome,
    cartaoValor: cartaoValor
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


export const deleteCard = async (id: number) => {

  const response = await axios.delete(`${baseURl}/cartoes/${id}`)

  if (response.status === 204) {

    return {
      status: 'success',
      message: 'Cartão removido com sucesso!'
    }
  } else {

    return {
      status: 'error',
      message: 'Erro ao remover o cartão!'
    }
  }
}

export const getCard = async (id: number) => {

  const response = await axios.get(`${baseURl}/cartoes/${id}`)

  if (response.status === 200) {

    const data: CardTypes[] = response.data

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