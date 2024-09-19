import axios from "axios";

const baseURl = process.env.API_URL

export const getAnalytics = async () => {

  const response = await axios.get(`${baseURl}/transacoes`)

  if (response.status === 200) {

    const data = response.data;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const filteredData = data.map((d) => ({
      valor: parseFloat(d.valor),
      month: new Date(d.data_lancamento).toLocaleString('en-US', { month: 'short' }),
    }));

    // Agrupar e somar os valores por mês
    const summedData = filteredData.reduce((acc, curr) => {
      const month = curr.month;

      // Se o mês já existe no acumulador, some o valor
      if (acc[month]) {
        acc[month] += curr.valor;
      } else {
        // Caso contrário, inicialize o valor para o mês
        acc[month] = curr.valor;
      }

      return acc;
    }, {});

    // Converter o objeto em um array de objetos com mês e soma dos valores
    const result = Object.keys(summedData).map(month => ({
      month,
      total: summedData[month],
    }));

    // Ordenar o resultado pela ordem dos meses
    const sortedResult = result.sort((a, b) => {
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

    return sortedResult;

  } else {

    return [{}]
  }
}