import BarsData from "@components/BarsData"
import InOutComes from "@components/InOutComes"
import Layout from "@components/Layout"
import Container from '@components/Container'
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimelineDot from '@mui/lab/TimelineDot';
import { Button } from "@mui/material";
import Carousel from "@components/Carousel";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { getCards, getCategorie, getTransactions } from "./services";
import BankCard from "@/components/BankCards";
import { PieValueType } from "@mui/x-charts";
import InputSelect from "@/components/InputSelect";
import DataTable from "@/components/DataTable";
import { DataTableColumnType } from "@/components/DataTable/DataTableBody/types";
import { DataTableItemConverter } from "@/utils/DataTableItemConverter";
import { getEstablishments } from "@/services/estabelecimentos";
import CountUp from "react-countup";

const DashboardPage = () => {

	const columns: DataTableColumnType[] = [
    { name: 'Código', type: 'number', key: true},
    { name: 'Nome', type: 'string', brand: true, brandType: 'image'},
    { name: 'Descrição', type: 'string', hidden: true},
    { name: 'Data', type: 'string', format: (value: string | number) => typeof value === 'string' ?
       new Date(value).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'}) : 
       value.toString()},
    { name: 'Valor', type: 'float', format: (value: string | number) => typeof value === 'string' ? 
      parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) :
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
    },
    { name: 'Status', type: 'string'},
    { name: 'Estabelecimento', type: 'number', hidden: true},
    { name: 'Categoria', type: 'number', hidden: true},
		{ name: 'Cartão', type: 'number', hidden: true}
  ]

	const [transactions, setTransactions] = useState<TransactionTypes[]>([])
	const [rows, setRows] = useState<(string | number | string[])[][]>([])
	const [cards, setCards] = useState<CardTypes[]>([])
	const [cardsTotal, setCardsTotal] = useState<number>(0)
	const [pieData, setPieData] = useState<PieValueType[]>([])
	const [PieDataTotalValue, setPieDataTotalValue] = useState<number>(0)
	const [dataInicio, setDataInicio] = useState<string>(() => {
		const today = new Date();
		const year = today.getUTCFullYear();
		const month = String(today.getUTCMonth() + 1).padStart(2, '0');
		const day = '01'
		return `${year}-${month}-${day}`;
	});
	const [items, setItems] = useState({ columns: columns, rows: rows})
	const completeDate = `${dataInicio} 00:00:00`
	const [transfersValue, setTransfersValue] = useState<number>(0)
	const [receiptsValue, setReceiptsValue] = useState<number>(0)
	const [transfersPorcentage, setTransfersPorcentage] = useState<number>(0)
	const [receiptsPorcentage, setReceiptsPorcentage] = useState<number>(0)

	const fetchTransactions = async () => await getTransactions(completeDate).then( data => data)

  useEffect( () => {

    fetchTransactions().then( ({ data }) => {
			setTransactions(data)

			const totalTransfersValue = data.map( d => d.transacaoStatus === 'Transferência' ? parseFloat(d.transacaoValor) : 0).reduce((acc, curr) => acc + curr, 0)
			const totalReceiptsValue = data.map( d => d.transacaoStatus === 'Recebimento' ? parseFloat(d.transacaoValor): 0).reduce((acc, curr) => acc + curr, 0)

			setTransfersValue(totalTransfersValue)
			setReceiptsValue(totalReceiptsValue)

			const total = totalReceiptsValue + totalTransfersValue
			setTransfersPorcentage(((totalTransfersValue / total) * 100))
			setReceiptsPorcentage(((totalReceiptsValue / total) * 100))
		})
  }, [dataInicio])

	useEffect(() => {

		setItems( (prev) => {

			const currentItems = {...prev}
			currentItems.rows = rows
			return currentItems
		})
	}, [rows])

  useEffect(() => {

    if (transactions) {
      const convertedTransactions: (string | number | string[])[][] = DataTableItemConverter(transactions)

			// buscando links
			getEstablishments().then( (establishments) => {

				//adicionando uma brand nas transações
				const transactionsWithBrand = convertedTransactions.map( (transaction) => {

					const updatedTransaction = [...transaction]
					const link = establishments.map( establishment => establishment.estabelecimentoId === transaction[6] && establishment.estabelecimentoLink).filter(Boolean)[0]

					updatedTransaction[1] = [
						link ? `https://cdn.brandfetch.io/${link}/w/400/h/400` : 'https://www.advocacianunes.com.br/wp-content/uploads/2022/04/logo-pix-icone-1024.png',
						typeof transaction[1] === 'string' ? transaction[1] : '', 
					]
					return updatedTransaction
				})

				setRows(transactionsWithBrand)
			})
    }
  }, [transactions])

	useEffect(() => {
		
		getTransactions(completeDate).then(async ({ data }) => {

			const filteredTransactions = data.map((data: TransactionTypes) => (
				{
					categoria: data.categoriaID,
					valor: parseFloat(data.transacaoValor)
				}
			))

			const summedTransactions = filteredTransactions.reduce((acc: { [categoria: string]: number }, curr) => {

				const categoria = curr.categoria

				if (acc[categoria]) {

					acc[categoria] += curr.valor
				} else {

					acc[categoria] = curr.valor
				}

				return acc
			}, {})

			const pieDataResult = await Promise.all(
				Object.keys(summedTransactions).map(async (id) => {
					const categoriaId = parseInt(id);

					const label = await getCategorie(categoriaId).then(({ data }) => data[0].categoriaNome);
					const color = await getCategorie(categoriaId).then(({ data }) => data[0].categoriaCor);

					return {
						id: categoriaId,
						label,
						color,
						value: summedTransactions[categoriaId],
					};
				})
			);

			const totalValue = pieDataResult.reduce((total, { value }) => total + parseFloat(value.toString()), 0);

			setPieDataTotalValue(totalValue)
			setTransactions(data)
			setPieData(pieDataResult)
		}).catch(data => data)
	}, [dataInicio])

	useEffect(() => {

		getCards().then(({ data }) => {

			let total: number = 0

			data.forEach(({ cartaoValor }) => total += parseFloat(cartaoValor))
			setCards(data)
			setCardsTotal(total)
		})
	}, [])

	const pieParams = {
		height: 200,
		slotProps: { legend: { hidden: true } },
	};

	const selectYearItems = [
		{
			value: '2020',
		},
		{
			value: '2021',
		},
		{
			value: '2023',
		},
		{
			value: '2024',
		}
	]

	const selectMonthItems = [
		{
			value: 'Jan'
		},
		{
			value: 'Feb'
		},
		{
			value: 'Mar'
		}
	]

	return (
		<Layout className="flex justify-between gap-6 pr-5 overflow-hidden">
			<div className="flex w-full flex-col gap-6 overflow-y-auto">
				<div className="flex w-full gap-6">
					<Container className="flex gap-5 p-5">
						<InOutComes type='in' value={receiptsValue} porcentage={receiptsPorcentage} severity='success' />
					</Container>
					<Container className="flex gap-5 p-5">
						<InOutComes type='out' value={transfersValue} porcentage={transfersPorcentage} severity='danger' />
					</Container>
				</div>
				<div className="flex flex-col gap-6 pb-6">
					<Container className="p-5 pt-5">
						<div className="px-1 font-bold text-2xl w-full flex justify-between">
							<h2>Analytics</h2>
							<div className="flex gap-5 items-center">
								<div className="flex gap-3 items-center">
									<TimelineDot className="bg-[rgb(56,189,248)]" />
									<p className="text-sm">Income</p>
								</div>
								<div className="flex gap-3 items-center">
									<TimelineDot className="bg-[rgb(99,89,233)]" />
									<p className="text-sm">Outcome</p>
								</div>
								<InputSelect menuItems={selectYearItems} />
							</div>
						</div>
						<BarsData dataInicio={completeDate}/>
					</Container>
					<DataTable title='Transações' items={items} onAddAction={() => {}} onEditAction={() => {}} onDeleteAction={() => {}} controls='hidden' onDateChange={(e) => setDataInicio(e)} dataInicio={dataInicio}/>
				</div>
			</div>
			<div className="flex w-auto flex-col">
				<div className="flex flex-col gap-6 w-[400px] h-auto overflow-y-auto pb-6">
					<Container className="w-full h-[500px] flex flex-col gap-4 p-5">
						<h2 className="w-full text-2xl font-bold">My Card</h2>
						<div className="flex flex-col">
							<p className="text-projectPallet-tertiary">Card Balance</p>
							<p className="font-bold text-2xl">
								<CountUp
									className="account-balance"
									start={0}
									end={cardsTotal}
									duration={1}
									useEasing={true}
									separator=","
									formattingFn={(e) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
								/>
							</p>
						</div>
						<Carousel>
							{
								cards.length > 0 ?

									cards.map(({ cartaoNome, cartaoUsuario, cartaoValor }, index) => (
										<BankCard key={index} nome={cartaoNome} usuario={cartaoUsuario} valor={cartaoValor} />
									))
									:
									<div>
										Nenhum cartão cadastrado!
									</div>
							}
						</Carousel>
						<div className="w-full h-full flex gap-3 justify-between">
							<Button className="bg-projectPallet-secondary rounded-xl text-white font-bold p-4 w-full">
								Manage Cards
							</Button>
							<Button className="border border-white text-white rounded-xl font-bold w-full" variant="outlined">
								Transfer
							</Button>
						</div>
					</Container>
					<Container className="w-full h-full p-5">
						<div className="flex justify-between">
							<h2 className="w-full text-2xl font-bold">Activity</h2>
							<InputSelect menuItems={selectMonthItems} />
						</div>
						<PieChart
							series={[
								{
									data: pieData,
									innerRadius: 100,
									outerRadius: 150,
									paddingAngle: 0,
									cornerRadius: 10,
									startAngle: -90,
									endAngle: 90,
									cx: 150,
									cy: 150,
									valueFormatter: ({ value }) => value.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL'
									})
								},
							]}
							width={315}
							className="w-full top-10"
							tooltip={{
								trigger: 'item',
							}}
							{...pieParams}
						/>
						<div className="w-full px-10 flex flex-col gap-5">
							<div className=" grid grid-cols-2 gap-5 w-full justify-between">

								{pieData.map(({ label, color, value }, index) => {
									const percentage = value === 0 ? value : (value / PieDataTotalValue) * 100;

									return (
										<div key={index} className="">
											<div className="flex w-full gap-2 items-center">
												<TimelineDot className="w-2" style={{ backgroundColor: `${color}` }} />
												<span>
													{
														typeof (label) === "string" && label
													}
												</span>
											</div>
											<p>{percentage.toFixed(2)}%</p>
										</div>
									);
								})}
							</div>
							<Button className="border border-white text-white rounded-xl font-bold w-full gap-8 p-3" variant="outlined">
								<p>View all activity</p>
								<FontAwesomeIcon icon={faArrowRightLong} />
							</Button>
						</div>
					</Container>
				</div>
			</div>
		</Layout>
	)
}

export default DashboardPage