import axios from "axios";

const baseURl = process.env.API_URL

export const addTransaction = async ({ transacaoId, transacaoNome, transacaoDesc, dataLancamento, transacaoValor, transacaoStatus, estabelecimentoID, categoriaID, cartaoID }: TransactionTypes) => {

  const response = await axios.post(`${baseURl}/transacoes`, {
    transacaoNome: transacaoNome,
    transacaoDesc: transacaoDesc,
    dataLancamento: dataLancamento,
    transacaoValor: transacaoValor,
    transacaoStatus: transacaoStatus,
    estabelecimentoID: estabelecimentoID,
    categoriaID: categoriaID,
    cartaoID: cartaoID
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

export const deleteTransaction = async (id: number) => {

  const response = await axios.delete(`${baseURl}/transacoes/${id}`)

  if (response.status === 204) {

    return {
      status: 'success',
      message: 'Transação removida com sucesso!'
    }
  } else {

    return {
      status: 'error',
      message: 'Erro ao remover a transação!'
    }
  }
}

export const updateTransaction = async ({ transacaoId, transacaoNome, transacaoDesc, dataLancamento, transacaoValor, transacaoStatus, estabelecimentoID, categoriaID}: TransactionTypes) => {

  const response = await axios.patch(`${baseURl}/transacoes/${transacaoId}`, {
    transacaoNome: transacaoNome,
    transacaoDesc: transacaoDesc,
    dataLancamento: dataLancamento,
    transacaoValor: transacaoValor,
    transacaoStatus: transacaoStatus,
    estabelecimentoID: estabelecimentoID,
    categoriaID: categoriaID
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

export const getTransaction = async (id: number): Promise<TransactionResponse> => {

  const response = await axios.get(`${baseURl}/transacoes/${id}`)

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