import BarsData from "@components/BarsData"
import InOutComes from "@components/InOutComes"
import Layout from "@components/Layout"
import Container from '@components/Container'
import { faArrowRightLong, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimelineDot from '@mui/lab/TimelineDot';
import { Button } from "@mui/material";
import Carousel from "@components/Carousel";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useRef, useState } from "react";
import { getCards, getCategorie, getTransactions } from "./services";
import BankCard from "@/components/BankCards";
import { PieValueType } from "@mui/x-charts";
import InputSelect from "@/components/InputSelect";
import DataTable from "@/components/DataTable";
import { DataTableColumnType } from "@/components/DataTable/DataTableBody/types";
import { DataTableItemConverter } from "@/utils/DataTableItemConverter";
import { getEstablishments } from "@/services/estabelecimentos";
import CountUp from "react-countup";
import Link from "next/link";

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
    { name: 'Status', type: 'string', categorized: true, categoryCondition: (e) => {

      if (e === 'Transferência') {
        return 'bg-red-500'
      } else if (e === 'Recebimento') {
        return 'bg-green-600'
      }
    }, align: 'center'},
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
	const containerRef = useRef<HTMLDivElement>(null);

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
		<Layout className="flex justify-between gap-3 pr-3 overflow-hidden">
			<div className="flex w-full flex-col gap-3 overflow-y-auto">
				<div className="flex w-full gap-3">
					<Container className="flex gap-3 p-3">
						<InOutComes type='in' value={receiptsValue} porcentage={receiptsPorcentage} severity='success' />
					</Container>
					<Container className="flex gap-3 p-3">
						<InOutComes type='out' value={transfersValue} porcentage={transfersPorcentage} severity='danger' />
					</Container>
				</div>
				<div className="flex flex-col gap-3 pb-3">
					<Container className="px-3 pt-3">
						<div className="font-bold text-xl w-full flex justify-between">
							<h2 className="text-projectPalletLight-tertiary dark:text-projectPalletLight-secondary">Analytics</h2>
							<div className="flex gap-3 items-center">
								<div className="flex gap-3 items-center">
									<TimelineDot className="bg-[rgb(56,189,248)]" />
									<p className="text-sm dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary">Income</p>
								</div>
								<div className="flex gap-3 items-center">
									<TimelineDot className="bg-[rgb(99,89,233)]" />
									<p className="text-sm dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary">Outcome</p>
								</div>
								<InputSelect menuItems={selectYearItems} />
							</div>
						</div>
						<BarsData dataInicio={completeDate}/>
					</Container>
					<div className="max-h-[642px]">
						<DataTable title='Transações' items={items} onAddAction={() => {}} onEditAction={() => {}} onDeleteAction={() => {}} controls='hidden' onDateChange={(e) => setDataInicio(e)} dataInicio={dataInicio}/>
					</div>
				</div>
			</div>
			<div className="flex w-auto flex-col">
				<div className="flex flex-col gap-3 w-[300px] h-auto overflow-y-auto pb-3">
					<Container className="w-full h-auto flex flex-col gap-4 p-3">
						<h2 className="w-full text-xl font-bold dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary">My Card</h2>
						<div className="flex flex-col">
							<p className="dark:text-projectPallet-tertiary text-projectPalletLight-tertiary">Cards Balance</p>
							<p className="font-bold text-xl dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary">
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
						<div className="flex flex-col justify-between h-full">
							<Carousel>
								{
									cards.length > 0 ?

										cards.map(({ cartaoNome, cartaoUsuario, cartaoValor }, index) => (
											<BankCard key={index} nome={cartaoNome} usuario={cartaoUsuario} valor={cartaoValor} />
										))
										:
										<div className="font-bold flex gap-2 items-center pt-5 text-lg">
											<FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-500"/>
											<p>Nenhum cartão cadastrado!</p>
										</div>
								}
							</Carousel>
							<div className="w-full h-10 flex gap-3 justify-between">
								<Link href={'/manage/cartoes'} className="w-full h-full">
									<Button className="dark:bg-projectPallet-secondary bg-projectPalletLight-primary rounded-xl text-white font-bold w-full h-full" sx={{fontSize: 12}}>
										Manage Cards
									</Button>
								</Link>
								{
									cards.length > 0 && <Link href={'/analytics'} className="w-full h-full">	
									<Button className="border-2 dark:border-projectPalletLight-secondary border-projectPalletLight-primary dark:text-projectPalletLight-secondary text-projectPalletLight-primary rounded-xl font-bold w-full h-full" variant="outlined" sx={{ fontSize: 12}}>
										Transfer
									</Button>
								</Link>
								}
							</div>
						</div>
					</Container>
					<Container className="w-full p-3 flex flex-col justify-between">
						<div className="flex justify-between">
							<h2 className="w-full text-xl font-bold dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary">Categories</h2>
							<InputSelect menuItems={selectMonthItems} />
						</div>
						<div ref={containerRef} className="max-h-[165px] flex items-end justify-center">
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
								width={310}
								className="w-full top-10"
								tooltip={{
									trigger: 'item',
								}}
								{...pieParams}
							/>
						</div>
						<div className="w-full flex flex-col gap-3">
							<div className=" grid grid-cols-[repeat(2,_minmax(100px,_1fr))] gap-2 w-full justify-between overflow-hidden whitespace-nowrap text-ellipsis">

								{pieData.map(({ label, color, value }, index) => {
									const percentage = value === 0 ? value : (value / PieDataTotalValue) * 100;

									return (
										<div key={index} className="border px-2 pb-2 rounded-xl dark:border-projectPallet-tertiary">
											<div className="flex gap-2 items-center">
												<TimelineDot className="w-2" style={{ backgroundColor: `${color}` }} />
												<p className="overflow-hidden text-ellipsis dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary">
													{
														typeof (label) === "string" && label
													}
												</p>
											</div>
											<p className="dark:text-projectPalletLight-secondary text-projectPalletLight-tertiary">{percentage.toFixed(2)}%</p>
										</div>
									);
								})}
							</div>
							<Link href={'/manage/categorias'}>
								<Button className="border-2 dark:border-projectPalletLight-secondary border-projectPalletLight-primary dark:text-projectPalletLight-secondary text-projectPalletLight-primary rounded-xl font-bold w-full gap-2 p-3 h-10" sx={{ fontSize: 12}} variant="outlined">
									<p>View all categories</p>
								</Button>
							</Link>
						</div>
					</Container>
				</div>
			</div>
		</Layout>
	)
}

export default DashboardPage