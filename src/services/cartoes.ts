import axios from "axios";

const baseUrl = process.env.API_URL

export const updateCard = async ({ cartaoId, cartaoAgencia, cartaoUsuario, cartaoNome, cartaoValor }: CardTypes) => {

  const response = await axios.patch(`${baseUrl}/cartoes/${cartaoId}`, {
    cartaoAgencia: cartaoAgencia,
    cartaoUsuario: cartaoUsuario,
    cartaoNome: cartaoNome,
    cartaoValor: cartaoValor
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