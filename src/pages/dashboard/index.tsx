import BarsData from "@/components/BarsData"
import InOutComes from "@/components/InOutComes"
import Layout from "@/components/Layout"
import Container from '@components/Container'
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimelineDot from '@mui/lab/TimelineDot';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputSearch from "@/components/InputSearch";
import { Button } from "@mui/material";
import Carousel from "@/components/Carousel";
import NuBank from "@/components/BankCards/NuBank";


const DashboardPage = () => {
	return (
		<Layout className="flex gap-6 overflow-hidden">
			<div className="flex flex-col gap-6 overflow-y-auto pb-6">
				<div className="flex w-full gap-6">
					<Container className="flex gap-5">
						<InOutComes type='in' value='0,00' porcentage='0' severity='success'/>
					</Container>
					<Container className="flex gap-5">
						<InOutComes type='out' value='0,00' porcentage='0' severity='danger'/>
					</Container>
				</div>
				<div className="flex flex-col gap-6">
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
							<h2>Transaction</h2>
							<div className="flex gap-3 w-[500px]">
								<InputSearch 
									placeholder="Search for anything..." 
									className="w-full gap-3 bg-projectPallet-primary text-sm" 
									inputClassName="bg-transparent text-white text-sm placeholder:text-projectPallet-tertiary font-light"
								/>
								<input type="date" className="rounded-xl bg-transparent border-2 border-projectPallet-tertiary p-2 text-sm w-full text-projectPallet-tertiary outline-none"/>
							</div>
						</div>
					</Container>
				</div>
			</div>
			<div className="flex flex-col gap-6 pb-6">
				<Container className="w-full h-full flex flex-col gap-6">
					<div className="">
						<h2 className="w-full text-2xl font-bold">My Card</h2>
					</div>
					<div className="flex flex-col">
						<p className="text-projectPallet-tertiary">Card Balance</p>
						<p className="font-bold text-2xl">R$ 0,00</p>
					</div>
					<Carousel>
						<NuBank/>
					</Carousel>
					<div className="w-full flex gap-3">
						<Button className="bg-projectPallet-secondary text-white font-bold p-2">
							Manage Cards
						</Button>
						<Button className="border border-white text-white font-bold" variant="outlined">
							Transfer
						</Button>
					</div>
				</Container>
				<Container className="h-full">

				</Container>
			</div>
		</Layout>
	)
}

export default DashboardPage