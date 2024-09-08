import InOutComes from "@/components/InOutComes"
import Layout from "@/components/Layout"
import Container from '@components/Container'
import { faArrowDownLong, faArrowUpLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DashboardPage = () => {
	return (
		<Layout className="pt-10 flex gap-6">
			<div className="flex flex-col w-full gap-6">
				<div className="flex w-full gap-6">
					<Container className="flex gap-5">
						<InOutComes type='in' value='0,00' porcentage='0' severity='success'/>
					</Container>
					<Container className="flex gap-5">
						<InOutComes type='out' value='0,00' porcentage='0' severity='danger'/>
					</Container>
				</div>
				<div className="flex flex-col gap-6">
					<Container>

					</Container>
					<Container>

					</Container>
				</div>
			</div>
			<div className="w-[500px] flex flex-col gap-6 pb-6">
				<Container className="h-full">

				</Container>
				<Container className="h-full">
					
				</Container>
			</div>
		</Layout>
	)
}

export default DashboardPage