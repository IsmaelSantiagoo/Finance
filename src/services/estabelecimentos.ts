import axios from "axios";

const baseUrl = process.env.API_URL

export const getEstabelecimentos = async () => {

	const response = await axios.get(`${baseUrl}/estabelecimentos`)

	if (response.status === 200) {

		const data: EstablishmentTypes[] = response.data

		return data
	} else {

		return []
	}
}