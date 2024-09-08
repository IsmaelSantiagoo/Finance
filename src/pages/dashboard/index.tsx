import Layout from "@/components/Layout"
import Container from '@components/Container'

const DashboardPage = () => {
	return (
		<Layout className="pt-10 flex gap-6">
			<div className="flex flex-col w-full gap-6">
				<div className="flex w-full gap-6">
					<Container>
					</Container>
					<Container>
					
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