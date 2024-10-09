import axios from "axios";

const baseUrl = process.env.API_URL

export const getCategorias = async () => {

	const response = await axios.get(`${baseUrl}/categorias`)

	if (response.status === 200) {

		const data: CategoryTypes[] = response.data

		return data
	} else {

		return []
	}
}