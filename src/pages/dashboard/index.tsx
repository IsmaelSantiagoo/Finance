import BarsData from "@components/BarsData"
import InOutComes from "@components/InOutComes"
import Layout from "@components/Layout"
import Container from '@components/Container'
import { faAngleDown, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimelineDot from '@mui/lab/TimelineDot';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputSearch from "@components/InputSearch";
import { Button, colors } from "@mui/material";
import Carousel from "@components/Carousel";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { getCards, getCategorie, getEstablishmentById, getTransactions } from "./services";
import BankCard from "@/components/BankCards";
import { CardTypes, CompactTransactionResponse, EstablishmentTypes, TransactionTypes } from "./types";
import { PieValueType } from "@mui/x-charts";
import TransactionsContainer from "@/components/Transactions";

const DashboardPage = () => {

	const today = new Date();
	const year = today.getUTCFullYear();
	const month = String(today.getUTCMonth() + 1).padStart(2, '0'); // Mês começa em 0
	const day = String(today.getUTCDate()).padStart(2, '0');
	const [transactions, setTransactions] = useState<CompactTransactionResponse[]>([])
	const [filteredTransactions, setFilteredTransactions] = useState<CompactTransactionResponse[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')
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

	useEffect(() => {
		const completeDate = `${dataInicio} 00:00:00`

		getTransactions(completeDate).then(async ({ data }) => {
			
			const compactTransaction = await Promise.all(

				data.map(async (transacao: TransactionTypes): Promise<CompactTransactionResponse> => {

					const establishmentLink = await getEstablishmentById(transacao.estabelecimentoID)
						.then(({ data }: EstablishmentTypes) => data[0].estabelecimentoLink)
						.catch(() => 'erro');
					
					return {
						transacao: transacao,
						estabelecimentoLink: establishmentLink
					};
				})
			);

			const filteredTransactions = compactTransaction.map( ({ transacao }) => (
				{
					categoria: transacao.categoriaID,
					valor: parseFloat(transacao.transacaoValor)
				}
			))

			const summedTransactions = filteredTransactions.reduce((acc: { [ categoria: number]: number }, curr) => {

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
			
					const label = await getCategorie(categoriaId).then( ({ data }) => data[0].categoriaNome);
					const color = await getCategorie(categoriaId).then( ({ data }) => data[0].categoriaCor);
					
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
			setTransactions(compactTransaction)
			setFilteredTransactions(compactTransaction)
			setPieData(pieDataResult)
		}).catch((error) => console.error(error));
	}, [dataInicio])

	useEffect(() => {

		const filtered = transactions.filter(({ transacao }) =>
      transacao.transacaoNome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTransactions(filtered);
	}, [searchTerm, transactions])

	useEffect(() => {

		getCards().then(({ data }) => {
			
			let total: number = 0
			console.log(data)

			data.forEach(({ cartaoValor }) => total += parseFloat(cartaoValor))
			setCards(data)
			setCardsTotal(total)
		})
	}, [])

	const pieParams = {
		height: 200,
		slotProps: { legend: { hidden: true } },
	};

	return (
		<Layout className="flex justify-between gap-6 pr-5 overflow-hidden">
			<div className="flex w-full flex-col gap-6 overflow-y-auto">
				<div className="flex w-full gap-6">
					<Container className="flex gap-5">
						<InOutComes type='in' value='0,00' porcentage='0' severity='success'/>
					</Container>
					<Container className="flex gap-5">
						<InOutComes type='out' value='0,00' porcentage='0' severity='danger'/>
					</Container>
				</div>
				<div className="flex flex-col gap-6 pb-6">
					<Container className="p-0 pt-5">
						<div className="px-1 font-bold text-2xl w-full flex justify-between">
							<h2>Analytics</h2>
							<div className="flex gap-5 items-center">
								<div className="flex gap-3 items-center">
									<TimelineDot className="bg-[rgb(56,189,248)]"/>
									<p className="text-sm">Income</p>
								</div>
								<div className="flex gap-3 items-center">
									<TimelineDot className="bg-[rgb(99,89,233)]"/>
									<p className="text-sm">Outcome</p>
								</div>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={10}
									className="w-[125px] h-8 rounded-xl text-projectPallet-tertiary border-projectPallet-tertiary border-2"
									IconComponent={() => <FontAwesomeIcon icon={faAngleDown} className="w-full"/>}
								>
									<MenuItem value={10}>2020</MenuItem>
									<MenuItem value={20}>2021</MenuItem>
									<MenuItem value={30}>2022</MenuItem>
								</Select>
							</div>
						</div>
						<BarsData/>
					</Container>
					<TransactionsContainer title="Transactions" transactions={transactions} dataInicio={dataInicio} onDataChange={(e) => setDataInicio(e)} searchTerm={searchTerm} onSearch={(e) => setSearchTerm(e)}/>
				</div>
			</div>
			<div className="flex w-auto flex-col">
				<div className="flex flex-col gap-6 w-[400px] h-auto overflow-y-auto pb-6">
					<Container className="w-full h-[500px] flex flex-col gap-4">
						<h2 className="w-full text-2xl font-bold">My Card</h2>
						<div className="flex flex-col">
							<p className="text-projectPallet-tertiary">Card Balance</p>
							<p className="font-bold text-2xl">{cardsTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</p>
						</div>
						<Carousel>
							{
								cards.length > 0 ?

								cards.map(({ cartaoNome, cartaoUsuario, cartaoValor }, index) => (
									<BankCard key={index} nome={cartaoNome} usuario={cartaoUsuario} valor={cartaoValor}/>
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
					<Container className="w-full h-full">
						<div className="flex justify-between">
							<h2 className="w-full text-2xl font-bold">Activity</h2>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={10}
								className="w-[200px] h-8 rounded-xl text-projectPallet-tertiary border-projectPallet-tertiary border-2"
								IconComponent={() => <FontAwesomeIcon icon={faAngleDown} className="w-full"/>}
							>
								<MenuItem value={10}>Jan</MenuItem>
								<MenuItem value={20}>Feb</MenuItem>
								<MenuItem value={30}>Mar</MenuItem>
							</Select>
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
								const percentage = (value / PieDataTotalValue) * 100;

								return (
									<div key={index} className="">
										<div className="flex w-full gap-2 items-center">
											<TimelineDot className="w-2" style={{ backgroundColor: `${color}` }} />
											<span>
												{
													typeof(label) === "string" && label
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
								<FontAwesomeIcon icon={faArrowRightLong}/>
							</Button>
						</div>
					</Container>
				</div>
			</div>
		</Layout>
	)
}

export default DashboardPage