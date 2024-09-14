import BarsData from "@/components/BarsData"
import InOutComes from "@/components/InOutComes"
import Layout from "@/components/Layout"
import Container from '@components/Container'
import { faAngleDown, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimelineDot from '@mui/lab/TimelineDot';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputSearch from "@/components/InputSearch";
import { Button, colors } from "@mui/material";
import Carousel from "@/components/Carousel";
import NuBank from "@/components/BankCards/NuBank";
import PicPay from "@/components/BankCards/PIcPay";
import { PieChart } from "@mui/x-charts/PieChart";
import * as React from 'react'

const DashboardPage = () => {

	const pieParams = {
		height: 200,
		slotProps: { legend: { hidden: true } },
	};

	const pieData = [
		{
			id: 1,
			label: 'Teste',
			value: 20,
			color: 'rgb(99,89,233)'
		},
		{
			id: 2,
			label: 'Test2',
			value: 50,
			color: 'rgb(56,189,248)'
		},
]

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
					<Container>
						<div className="px-1 font-bold text-2xl w-full flex justify-between">
							<h2>Transactions</h2>
							<div className="flex gap-3 w-[500px]">
								<InputSearch 
									placeholder="Search for anything..." 
									className="w-full gap-3 bg-projectPallet-primary text-sm" 
									inputClassName="bg-transparent text-white text-sm placeholder:text-projectPallet-tertiary font-light"
								/>
								<input type="date" className="rounded-xl bg-transparent border-2 border-projectPallet-tertiary p-2 text-sm w-full text-projectPallet-tertiary outline-none"/>
							</div>
						</div>
						<div className="w-full flex justify-between pt-10 px-1">
							<p className="w-full">Name</p>
							<p className="w-full">Date</p>
							<p className="w-full">Amount</p>
							<p className="w-full">Status</p>
						</div>
						<div className="w-full flex justify-between">
							<div className="w-full flex justify-between pt-3 px-1">
								<div className="flex gap-4 items-center text-xl">
									<img src="https://placehold.co/150" alt="icone" width={40} className="rounded-full"></img>
									<p>Games</p>
								</div>
							</div>
							<div className="w-full flex items-center text-xl">
								<p>Mon, 20 April 2024</p>
							</div>
							<div className="w-full flex items-center text-xl">
								<p>R$ 0,00</p>
							</div>
							<div className="w-full flex items-center text-xl">
								<div className="w-full">
									<span className="bg-green-700 bg-opacity-20 text-green-700 p-2 rounded-2xl text-sm">Deposited</span>
								</div>
							</div>
						</div>
					</Container>
				</div>
			</div>
			<div className="flex w-auto flex-col">
				<div className="flex flex-col gap-6 w-[400px] h-auto overflow-y-auto pb-6">
					<Container className="w-full h-[500px] flex flex-col gap-4">
						<h2 className="w-full text-2xl font-bold">My Card</h2>
						<div className="flex flex-col">
							<p className="text-projectPallet-tertiary">Card Balance</p>
							<p className="font-bold text-2xl">R$ 0,00</p>
						</div>
						<Carousel>
							<NuBank total={0} name="Ismael Santiago"/>
							<PicPay total={0} name="Ismael Santiago"/>
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
								},
							]}
							width={315}
							className="w-full top-10"
							{...pieParams}
						/>
						<div className="w-full px-10 flex flex-col gap-5">
							<div className="w-full flex justify-between">
								{pieData.map((item) => (
									<div key={item.id} className="">
										<div className="flex w-full gap-2 items-center">
											<TimelineDot className={`w-2 bg-[${item.color}]`}/>
											<span>{item.label}</span>
										</div>
										<p>{item.value}%</p>
									</div>
								))}
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