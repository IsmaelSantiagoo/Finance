import axios from "axios"

const baseURl = process.env.API_URL;

export const addEstablishment = async ({ estabelecimentoId, estabelecimentoNome, estabelecimentoLink }: EstablishmentTypes) => {

  const response = await axios.post(`${baseURl}/estabelecimentos`, {
    estabelecimentoNome: estabelecimentoNome,
    estabelecimentoLink: estabelecimentoLink,
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


export const deleteEstablishment = async (id: number) => {

  const response = await axios.delete(`${baseURl}/estabelecimentos/${id}`)

  if (response.status === 204) {

    return {
      status: 'success',
      message: 'Estabelecimento removido com sucesso!'
    }
  } else {

    return {
      status: 'error',
      message: 'Erro ao remover o estabelecimento!'
    }
  }
}
