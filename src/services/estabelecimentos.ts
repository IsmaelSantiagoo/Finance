import axios from "axios";

const baseUrl = process.env.API_URL

export const getEstablishments = async () => {

	const response = await axios.get(`${baseUrl}/estabelecimentos`)

	if (response.status === 200) {

		const data: EstablishmentTypes[] = response.data

		return data
	} else {

		return []
	}
}

export const updateEstablishment = async ({ estabelecimentoId, estabelecimentoNome, estabelecimentoLink }: EstablishmentTypes) => {

  const response = await axios.patch(`${baseUrl}/estabelecimentos/${estabelecimentoId}`, {
    estabelecimentoNome: estabelecimentoNome,
		estabelecimentoLink: estabelecimentoLink
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