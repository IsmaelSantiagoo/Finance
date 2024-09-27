import axios from "axios";

const baseURl = process.env.API_URL

export const addTransaction = async ({ transacaoNome, transacaoDesc, dataLancamento, transacaoValor, transacaoStatus, estabelecimentoID, categoriaID }: TransactionTypes) => {

  const response = await axios.post(`${baseURl}/transacoes`, {
    transacaoNome: transacaoNome,
    transacaoDesc: transacaoDesc,
    dataLancamento: dataLancamento,
    transacaoValor: transacaoValor,
    transacaoStatus: transacaoStatus,
    estabelecimentoID: estabelecimentoID,
    categoriaID: categoriaID
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